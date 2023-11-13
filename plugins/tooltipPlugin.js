const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addUtilities, theme, variants }) => {
  const tooltipStyles = {
    '.tooltip': {
      position: 'relative',
      display: 'inline-block',
    },
    '.tooltip .tooltiptext': {
      visibility: 'hidden',
      width: '120px',
      backgroundColor: 'black',
      color: '#fff',
      textAlign: 'center',
      padding: '5px 0',
      borderRadius: '6px',
      position: 'absolute',
      zIndex: '1',
      top: '-700%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '.tooltip:hover .tooltiptext': {
      visibility: 'visible',
    },
  };

  addUtilities(tooltipStyles, variants('tooltip'));
});
