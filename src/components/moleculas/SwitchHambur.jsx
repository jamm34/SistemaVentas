import styled from 'styled-components';

export function SwitchHambur({ state, setstate }) {
  // handler que llama a la función pasada desde el layout
  const handleToggle = () => {
    if (typeof setstate === 'function') setstate(); // llama al toggle del padre
  };

  return (
    <Container>
      <label
        className={`burger ${state ? "toggle active" : "toggle"}`}
        onClick={handleToggle}
        aria-label={state ? "Cerrar menú" : "Abrir menú"}
      >
        {/* controlled input + onChange para evitar la advertencia de React */}
        <input
          type="checkbox"
          checked={!!state}
          onChange={handleToggle}
          aria-checked={!!state}
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  right: 20px;
  top: 15px;
  z-index: 2000;

  .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none; /* si prefieres accesibilidad, podemos ocultarlo de otra forma */
  }

  .burger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: ${({ theme }) => theme.color1};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  .burger span:nth-of-type(1) { top: 0px; transform-origin: left center; }
  .burger span:nth-of-type(2) { top: 50%; transform: translateY(-50%); transform-origin: left center; }
  .burger span:nth-of-type(3) { top: 100%; transform-origin: left center; transform: translateY(-100%); }

  .toggle.active span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }
  .toggle.active span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }
  .toggle.active span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }
`;
