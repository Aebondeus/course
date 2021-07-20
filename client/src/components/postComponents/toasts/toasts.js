import { Toast } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export const ToastSuccess = ({ setSuccess, show, style }) => (
  <Toast
    onClose={() => setSuccess(false)}
    show={show}
    delay={3000}
    autohide
    style={style}
  >
    <Toast.Header>
      <strong>
        <FormattedMessage id="post-rate-success.header" />
      </strong>
    </Toast.Header>
    <Toast.Body>
      <FormattedMessage id="post-rate-success.body" />
    </Toast.Body>
  </Toast>
);

export const ToastFaliure = ({ setError, show, style }) => (
  <Toast
    onClose={() => setError(false)}
    show={show}
    delay={3000}
    autohide
    style={style}
  >
    <Toast.Header>
      <strong>
        <FormattedMessage id="post-rate-error.header" />
      </strong>
    </Toast.Header>
    <Toast.Body>
      <FormattedMessage id="post-rate-error.body" />
    </Toast.Body>
  </Toast>
);

export const ToastComment = ({ setShow, show }) => (
  <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
    <Toast.Header>
      <strong className="mr-auto">
        <FormattedMessage id="comments-form.sent.header" />
      </strong>
    </Toast.Header>
    <Toast.Body>
      <FormattedMessage id="comments-form.sent.body" />
    </Toast.Body>
  </Toast>
);

export const ToastError = ({ setError, show }) => (
  <Toast onClose={() => setError(false)} show={show} delay={3000} autohide>
    <Toast.Header>
      <strong className="mr-auto">Forbidden!</strong>
    </Toast.Header>
    <Toast.Body>Forbidden!</Toast.Body>
  </Toast>
);
