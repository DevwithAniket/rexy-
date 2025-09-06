/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { text } from 'framer-motion/client';
import PropTypes from 'prop-types';
import { href, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Common Button
 */
const Button = ({
  classes = '',
  variant = 'filled',
  color = 'primary',
  children,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${color} ${classes}`}
      {...rest}
    >
      {children}
      <div className='state-layer'></div>
    </button>
  );
};

Button.propTypes = {
  classes: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  children: PropTypes.node,
};

/**
 * Icon Button
 */
const IconButton = ({ classes = '', icon, size = '', children, ...rest }) => {
  return (
    <motion.button
      className={`icon-btn ${size} ${classes}`}
      {...rest}
    >
      {children}

      {!children && (
        <span className='material-symbols-rounded icon'>{icon}</span>
      )}

      <div className='state-layer'></div>
    </motion.button>
  );
};

IconButton.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', '']),
  children: PropTypes.node,
};

/**
 * Extended fab
 */
const ExtendedFab = ({ href, text, classes = '', ...rest }) => {
  return (
    <Link
      to={href}
      className={`extended-fab ${classes}`}
      {...rest}
    >
      <span className="material-symbols-rounded">add</span>

      <span className="truncate">{text}</span>

      <div className="state-layer"></div>
    </Link>
  );
};

ExtendedFab.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.string,
};

export { Button, IconButton, ExtendedFab };
