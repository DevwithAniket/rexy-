/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string,
}; 

export default PageTitle
