// src/components/ui/Button.js
import { playSound } from '../../utils/audio';

const Button = ({ onClick, children, className = '', disabled = false, title = '', ...rest }) => (
  <button
    {...rest}
    onClick={() => { playSound('click'); if(onClick) onClick(); }}
    className={`game-button  ${className}`}
    disabled={disabled}
    title={title}
  >
    {children}
  </button>
);

export default Button;