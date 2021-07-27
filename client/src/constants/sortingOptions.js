import { FormattedMessage } from "react-intl";

export const sortOptions = [
  {
    label: <FormattedMessage id="user-posts.sort-name-desc" />,
    value: { name: -1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-name-asc" />,
    value: { name: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-date-asc" />,
    value: { updated: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-date-desc" />,
    value: { updated: -1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-length-asc" />,
    value: { length: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-length-desc" />,
    value: { length: -1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-rating-asc" />,
    value: { ratingTotal: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-rating-desc" />,
    value: { ratingTotal: -1 },
  },
];
