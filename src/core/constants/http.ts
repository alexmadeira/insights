export const HTTP_RESPONSE_CODE = [
  'continue',
  'switching_protocols',
  'processing',
  'early_hints',

  'ok',
  'created',
  'accepted',
  'non_authoritative_information',
  'no_content',
  'reset_content',
  'partial_content',
  'multi_status',
  'already_reported',
  'im_used',

  'multiple_choices',
  'moved_permanently',
  'found',
  'see_other',
  'not_modified',
  'use_proxy',
  'switch_proxy',
  'temporary_redirect',
  'permanent_redirect',

  'bad_request',
  'unauthorized',
  'payment_required',
  'forbidden',
  'not_found',
  'method_not_allowed',
  'not_acceptable',
  'proxy_authentication_required',
  'request_timeout',
  'conflict',
  'gone',
  'length_required',
  'precondition_failed',
  'payload_too_large',
  'uri_too_long',
  'unsupported_media_type',
  'range_not_satisfiable',
  'expectation_failed',
  'im_a_teapot',
  'misdirected_request',
  'unprocessable_entity',
  'locked',
  'failed_dependency',
  'too_early',
  'upgrade_required',
  'precondition_required',
  'too_many_requests',
  'request_header_fields_too_large',
  'unavailable_for_legal_reasons',

  'internal_server_error',
  'not_implemented',
  'bad_gateway',
  'service_unavailable',
  'gateway_timeout',
  'http_version_not_supported',
  'variant_also_negotiates',
  'insufficient_storage',
  'loop_detected',
  'not_extended',
  'network_authentication_required',

  'invalid_status_code',
] as const

export const HTTP_RESPONSE_CATEGORIES = [
  'information',
  'success',
  'redirection',
  'client_error',
  'server_error',
] as const