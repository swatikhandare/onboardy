import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledSwitch = styled.div<{disabled: boolean}>`
  display: inline-flex;
  position: relative;
  cursor: ${({disabled}) => disabled ? "initial" : "pointer"};
  border-radius: 34px;
  background-color: white;
  transition: all 0.3s;
  height: 30px;
  width: 55px;
  border: solid 1px var(--text-secondary);
  ${({disabled}) => disabled && css` cursor: not-allowed; opacity: .5; `}

  .switch-input {
    display: none;
  }

  .switch-slider {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #DCE4FF;
    transition: all 0.3s;
    transform: translateY(-50%);
  }

  .switch-input:checked + .switch-slider {
    background-color: var(--primary-color);
    left: 29px;
  }

  .switch-input:disabled + .switch-slider {
    cursor: not-allowed;
    opacity: .5;
  }

  .switch-label {
    margin-left: 10px;
  }
`

interface SwitchProps {
  label?: string
  onChange: (value: boolean) => void
  defaultChecked?: boolean
  disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({ label, onChange, defaultChecked = false, disabled = false }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = () => {
    if (disabled) return
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className="switch-container" style={{ display: "flex", alignItems: "center", gap: "10px"}} onClick={handleChange}>
      <StyledSwitch disabled={disabled}>
        <input type="checkbox" className="switch-input" checked={isChecked} onChange={handleChange} disabled={disabled} />
        <span className="switch-slider"></span>
      </StyledSwitch>
      {label && <span className="switch-label">{label}</span>}
    </div>
  );
};

export default Switch;