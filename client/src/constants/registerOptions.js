import { FormattedMessage } from "react-intl";

export const regPageOptions = {
  email: {
    required: <FormattedMessage id="register-email-req-error" />,
    pattern: {
      value: /^.+@.+\w$/,
      message: <FormattedMessage id="register-email-pattern-error" />,
    },
  },
  password: {
    required: <FormattedMessage id="register-password-req-error" />,
    minLength: {
      value: 3,
      message: <FormattedMessage id="register-password-len-error" />,
    },
  },
  nickname: {
    required: <FormattedMessage id="register-nick-req-error" />,
    minLength: {
      value: 1,
      message: <FormattedMessage id="register-nick-len-error" />,
    },
  },
};

export const authModalOptions = {
  email: {
    required: <FormattedMessage id="modal-email-error" />,
  },
  password: {
    required: <FormattedMessage id="modal-password-error" />,
  },
};
