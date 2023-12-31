/*
 * lws-minimal-secure-streams-seq
 *
 * Written in 2010-2020 by Andy Green <andy@warmcat.com>
 *
 * This file is made available under the Creative Commons CC0 1.0
 * Universal Public Domain Dedication.
 *
 *
 * This demonstrates the a minimal http client using secure streams api.
 *
 * It visits https://warmcat.com/ and receives the html page there.
 *
 * This is the "secure streams" api equivalent of minimal-http-client...
 * it shows how to use a sequencer to make it easy to build more complex
 * schemes on top of this example.
 *
 * The layering looks like this
 *
 *                        lifetime
 *
 * ------   app   ------  process
 * ----  sequencer  ----  process
 * --- secure stream ---  process
 * -------  wsi  -------  connection
 *
 * see minimal-secure-streams for a similar example without the sequencer.
 */

#include <libwebsockets.h>
#include <string.h>
#include <signal.h>

static int interrupted, bad = 1, flag_conn_fail, flag_h1post;
static const char * const default_ss_policy =
	"{"
	  "\"release\":"			"\"01234567\","
	  "\"product\":"			"\"myproduct\","
	  "\"schema-version\":"			"1,"
	  "\"retry\": ["	/* named backoff / retry strategies */
		"{\"default\": {"
			"\"backoff\": ["	 "1000,"
						 "2000,"
						 "3000,"
						 "5000,"
						"10000"
				"],"
			"\"conceal\":"		"5,"
			"\"jitterpc\":"		"20,"
			"\"svalidping\":"	"300,"
			"\"svalidhup\":"	"310"
		"}}"
	  "],"
	  "\"certs\": [" /* named individual certificates in BASE64 DER */
		/*
		 * Need to be in order from root cert... notice sometimes as
		 * with Let's Encrypt there are multiple possible validation
		 * paths, all the pieces for one validation path must be
		 * given, excluding the server cert itself.  Let's Encrypt
		 * intermediate is signed by their ISRG Root CA but also is
		 * cross-signed by an IdenTrust intermediate that's widely
		 * deployed in browsers.  We use the ISRG path because that
		 * way we can skip the extra IdenTrust root cert.
		 */
		"{\"dst_root_x3\": \""
	"MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/"
	"MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT"
	"DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow"
	"PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD"
	"Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB"
	"AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O"
	"rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq"
	"OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b"
	"xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw"
	"7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD"
	"aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV"
	"HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG"
	"SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69"
	"ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr"
	"AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz"
	"R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5"
	"JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo"
	"Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ"
		"\"}"
	  "],"
	  "\"trust_stores\": [" /* named cert chains */
		"{"
			"\"name\": \"le_via_dst\","
			"\"stack\": ["
				"\"dst_root_x3\""
			"]"
		"}"
	  "],"
	  "\"s\": [" /* the supported stream types */
		"{\"mintest\": {"
			"\"endpoint\":"		"\"warmcat.com\","
			"\"port\":"		"443,"
			"\"protocol\":"		"\"h1\","
			"\"http_method\":"	"\"GET\","
			"\"http_url\":"		"\"index.html\","
			"\"plugins\":"		"[],"
			"\"tls\":"		"true,"
			"\"opportunistic\":"	"true,"
			"\"retry\":"		"\"default\","
			"\"tls_trust_store\":"	"\"le_via_dst\""
		"}},"
		"{\"mintest-fail\": {"
			"\"endpoint\":"		"\"warmcat.com\","
			"\"port\":"		"22,"
			"\"protocol\":"		"\"h1\","
			"\"http_method\":"	"\"GET\","
			"\"http_url\":"		"\"index.html\","
			"\"plugins\":"		"[],"
			"\"tls\":"		"true,"
			"\"opportunistic\":"	"true,"
			"\"retry\":"		"\"default\","
			"\"tls_trust_store\":"	"\"le_via_dst\""
		"}},"
		"{\"minpost\": {"
			"\"endpoint\":"		"\"warmcat.com\","
			"\"port\":"		"443,"
			"\"protocol\":"		"\"h1\","
			"\"http_method\":"	"\"POST\","
			"\"http_url\":"		"\"testserver/formtest\","
			"\"plugins\":"		"[],"
			"\"tls\":"		"true,"
			"\"opportunistic\":"	"true,"
			"\"retry\":"		"\"default\","
			"\"tls_trust_store\":"	"\"le_via_dst\""
		"}}"
	  "]"
	"}"
;

typedef struct myss {
	struct lws_ss_handle 	*ss;
	void			*opaque_data;
	/* ... application specific state ... */
} myss_t;

/* secure streams payload interface */

static int
myss_rx(void *userobj, const uint8_t *buf, size_t len, int flags)
{
//	myss_t *m = (myss_t *)userobj;

	lwsl_user("%s: len %d, flags: %d\n", __func__, (int)len, flags);
	lwsl_hexdump_info(buf, len);

	/*
	 * If we received the whole message, we let the sequencer know it
	 * was a success
	 */
	if (flags & LWSSS_FLAG_EOM) {
		bad = 0;
		interrupted = 1;
	}

	return 0;
}

static int
myss_tx(void *userobj, lws_ss_tx_ordinal_t ord, uint8_t *buf, size_t *len,
	int *flags)
{
	// myss_t *m = (myss_t *)userobj;

	/* in this example, we don't send any payload */

	return 0;
}

static int
myss_state(void *userobj, void *sh, lws_ss_constate_t state,
		lws_ss_tx_ordinal_t ack)
{
	myss_t *m = (myss_t *)userobj;

	lwsl_user("%s: %s, ord 0x%x\n", __func__, lws_ss_state_name(state),
		  (unsigned int)ack);

	switch (state) {
	case LWSSSCS_CREATING:
		lws_ss_request_tx(m->ss);
		break;
	case LWSSSCS_ALL_RETRIES_FAILED:
		/* if we're out of retries, we want to close the app and FAIL */
		interrupted = 1;
		break;
	default:
		break;
	}

	return 0;
}

typedef enum {
	SEQ_IDLE,
	SEQ_TRY_CONNECT,
	SEQ_RECONNECT_WAIT,
	SEQ_CONNECTED,
} myseq_state_t;

typedef struct myseq {
	struct lws_ss_handle	*ss;

	myseq_state_t		state;
	int			http_resp;

	uint16_t		try;
} myseq_t;

/*
 * This defines the sequence of things the test app does.
 */

static lws_seq_cb_return_t
min_sec_str_sequencer_cb(struct lws_sequencer *seq, void *user, int event,
			 void *v, void *a)
{
	struct myseq *s = (struct myseq *)user;
	lws_ss_info_t ssi;

	switch ((int)event) {

	/* these messages are created just by virtue of being a sequencer */

	case LWSSEQ_CREATED: /* our sequencer just got started */
		s->state = SEQ_IDLE;
		lwsl_notice("%s: LWSSEQ_CREATED\n", __func__);

		/* We're making an outgoing secure stream ourselves */

		memset(&ssi, 0, sizeof(ssi));
		ssi.handle_offset = offsetof(myss_t, ss);
		ssi.opaque_user_data_offset = offsetof(myss_t, opaque_data);
		ssi.rx = myss_rx;
		ssi.tx = myss_tx;
		ssi.state = myss_state;
		ssi.user_alloc = sizeof(myss_t);

		/* requested to fail (to check backoff)? */
		if (flag_conn_fail)
			ssi.streamtype = "mintest-fail";
		else
			/* request to check h1 POST */
			if (flag_h1post)
				ssi.streamtype = "minpost";
			else
				/* default to h1 GET */
				ssi.streamtype = "mintest";

		if (lws_ss_create(lws_seq_get_context(seq), 0, &ssi, NULL,
				  &s->ss, seq, NULL)) {
			lwsl_err("%s: failed to create secure stream\n",
				 __func__);

			return LWSSEQ_RET_DESTROY;
		}
		break;

	case LWSSEQ_DESTROYED:
		lwsl_notice("%s: LWSSEQ_DESTROYED\n", __func__);
		break;

	case LWSSEQ_TIMED_OUT: /* current step timed out */
		if (s->state == SEQ_RECONNECT_WAIT)
			lws_ss_request_tx(s->ss);
		break;

	/*
	 * These messages are created because we have a secure stream that was
	 * bound to this sequencer at creation time.  It copies its state
	 * events to us as its sequencer parent.  v is the lws_ss_handle_t *
	 */

	case LWSSEQ_SS_STATE_BASE + LWSSSCS_CREATING:
		lwsl_info("%s: seq LWSSSCS_CREATING\n", __func__);
		lws_ss_request_tx(s->ss);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_DISCONNECTED:
		lwsl_info("%s: seq LWSSSCS_DISCONNECTED\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_UNREACHABLE:
		lwsl_info("%s: seq LWSSSCS_UNREACHABLE\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_AUTH_FAILED:
		lwsl_info("%s: seq LWSSSCS_AUTH_FAILED\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_CONNECTED:
		lwsl_info("%s: seq LWSSSCS_CONNECTED\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_CONNECTING:
		lwsl_info("%s: seq LWSSSCS_CONNECTING\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_DESTROYING:
		lwsl_info("%s: seq LWSSSCS_DESTROYING\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_POLL:
		/* somebody called lws_ss_poll() on the stream */
		lwsl_info("%s: seq LWSSSCS_POLL\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_ALL_RETRIES_FAILED:
		lwsl_info("%s: seq LWSSSCS_ALL_RETRIES_FAILED\n", __func__);
		interrupted = 1;
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_QOS_ACK_REMOTE:
		lwsl_info("%s: seq LWSSSCS_QOS_ACK_REMOTE\n", __func__);
		break;
	case LWSSEQ_SS_STATE_BASE + LWSSSCS_QOS_ACK_LOCAL:
		lwsl_info("%s: seq LWSSSCS_QOS_ACK_LOCAL\n", __func__);
		break;

	/*
	 * This is the message we send from the ss handler to inform the
	 * sequencer we had the payload properly
	 */

	case LWSSEQ_USER_BASE:
		bad = 0;
		interrupted = 1;
		break;

	default:
		break;
	}

	return LWSSEQ_RET_CONTINUE;
}

static void
sigint_handler(int sig)
{
	interrupted = 1;
}

int main(int argc, const char **argv)
{
	int n = 0, logs = LLL_USER | LLL_ERR | LLL_WARN | LLL_NOTICE;
	struct lws_context_creation_info info;
	struct lws_context *context;
	lws_seq_info_t i;
	const char *p;
	myseq_t *ms;

	signal(SIGINT, sigint_handler);

	if ((p = lws_cmdline_option(argc, argv, "-d")))
		logs = atoi(p);

	lws_set_log_level(logs, NULL);
	lwsl_user("LWS minimal secure streams [-d<verbosity>][-f][--h1post]\n");

	flag_conn_fail = !!lws_cmdline_option(argc, argv, "-f");
	flag_h1post = !!lws_cmdline_option(argc, argv, "--h1post");

	memset(&info, 0, sizeof info); /* otherwise uninitialized garbage */

	info.options = LWS_SERVER_OPTION_EXPLICIT_VHOSTS |
		       LWS_SERVER_OPTION_DO_SSL_GLOBAL_INIT;
	info.fd_limit_per_thread = 1 + 1 + 1;
	info.pss_policies_json = default_ss_policy;
	info.port = CONTEXT_PORT_NO_LISTEN;

	context = lws_create_context(&info);
	if (!context) {
		lwsl_err("lws init failed\n");
		return 1;
	}

	/*
	 * Create the sequencer that performs the steps of the test action
	 * from inside the event loop.
	 */

	memset(&i, 0, sizeof(i));
	i.context	= context;
	i.user_size	= sizeof(myseq_t);
	i.puser		= (void **)&ms;
	i.cb		= min_sec_str_sequencer_cb;
	i.name		= "min-sec-stream-seq";

	if (!lws_seq_create(&i)) {
		lwsl_err("%s: failed to create sequencer\n", __func__);
		goto bail;
	}

	/* the event loop */

	while (n >= 0 && !interrupted)
		n = lws_service(context, 0);

bail:
	lws_context_destroy(context);
	lwsl_user("Completed: %s\n", bad ? "failed" : "OK");

	return bad;
}
