import { useState, useRef, useEffect } from 'react';


const languageOptions = [
  { value: 'eng', label: 'English', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_the_United_States_%28Web_Colors%29.svg/960px-Flag_of_the_United_States_%28Web_Colors%29.svg.png' }, // Using GB for English
  { value: 'kh', label: 'ខ្មែរ', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png' }, // Cambodia
];

function LanguageSelectWithFlags({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null); // Ref for click outside detection

  // Find the currently selected option to display it
  const selectedOption = languageOptions.find(opt => opt.value === language) || languageOptions[0];

  // Effect to handle clicks outside the custom select to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]); // Re-run if selectRef changes (though it won't here)

  const handleOptionClick = (value) => {
    setLanguage(value);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="custom-select-container" ref={selectRef}>
      <div className="selected-item" onClick={() => setIsOpen(!isOpen)}>
        <img src={selectedOption.flagUrl} alt={`${selectedOption.label} Flag`} className="flag-icon" />
        {selectedOption.label}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <ul className="options-list">
          {languageOptions.map((option) => (
            <li
              key={option.value}
              className={`option-item ${option.value === language ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              <img src={option.flagUrl} alt={`${option.label} Flag`} className="flag-icon" />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelectWithFlags;