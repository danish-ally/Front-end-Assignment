import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [showPool, setShowPool] = useState(false);
  const [userId] = useState('user123'); // Simulated unique user ID
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions

  // Initial questions array
  const initialQuestions = [
    {
      id: 1,
      question: 'Kya karte ho?',
      options: ['Job', 'Business', 'Student', 'Other'],
    }, 
  {
    id: 2,
      question: 'Kya karte ho 2?',
        options: ['Job', 'Business', 'Student', 'Other'],
    }
  ];

  // Load answered questions from localStorage on mount
  useEffect(() => {
    const savedAnsweredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];
    setAnsweredQuestions(savedAnsweredQuestions);
  }, []);

  const handleAppClick = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      // If clicked 5 times, show the pool
      if (newCount === 5) {
        setShowPool(true);
        return 0; // Reset the click count after 5 clicks
      }
      return newCount;
    });
  };

  const handleOptionClick = (questionId, selectedOption) => {
    const answers = { userId, questionId, answer: selectedOption };

    // Send data to Google Sheets via SheetDB
    fetch('https://sheetdb.io/api/v1/28hwebqszxcfs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })
      .then((response) => {
        if (response.ok) {
          // Update answered questions
          const newAnsweredQuestions = [...answeredQuestions, questionId];
          setAnsweredQuestions(newAnsweredQuestions);

          // Save to localStorage to persist across page refresh
          localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));

          alert('Your answer has been saved!');
        } else {
          throw new Error('Failed to save answer');
        }
      })
      .catch((error) => console.error('Error saving answer:', error));
  };

  // Filter out the answered questions
  const unansweredQuestions = initialQuestions.filter((q) => !answeredQuestions.includes(q.id));

  return (
    <div
      className="App"
      style={{ maxHeight: '100vh', overflowY: 'auto', backgroundColor: "white" }}
      onClick={handleAppClick} // This will trigger on any click in the app
    >
      {!showPool && (
        <header className="App-header">
          <p style={{ color: "white" }}>
            Here's a long block of Lorem Ipsum text for you:

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus, ante et pharetra sodales, libero justo dapibus tortor, id varius risus justo at sapien. Sed feugiat malesuada mauris, at fringilla magna volutpat vel. Nullam et orci ac nulla volutpat viverra. Integer volutpat, leo eu tempus euismod, odio nunc sollicitudin erat, nec volutpat nulla velit id orci. Aenean sollicitudin orci vitae neque bibendum convallis. Integer ut bibendum nisi, ac consectetur orci. Fusce nec metus sit amet risus cursus gravida. Fusce vestibulum erat non ante aliquam, at sollicitudin erat elementum. Integer dictum velit sit amet ante auctor, nec maximus augue condimentum. Etiam at tempor lorem. Proin tempor turpis non nulla viverra tristique. Vestibulum vulputate, augue ut tristique venenatis, nulla nisi tincidunt nulla, at fermentum neque felis vitae est. Nulla pharetra, eros vitae tempus tempus, lorem purus congue ante, eget lacinia ligula tortor et eros.

            Pellentesque ac dolor justo. Donec luctus ipsum vel velit rhoncus facilisis. Aliquam erat volutpat. Donec porttitor purus augue, a luctus risus aliquet nec. Mauris fermentum, nulla in porttitor laoreet, elit ipsum tempor ex, at venenatis nulla ligula sed sapien. Morbi suscipit metus id tincidunt feugiat. Cras ut urna urna. Ut euismod sed risus vel rhoncus. Curabitur at viverra lorem. Quisque ultricies, augue sit amet vestibulum feugiat, lectus lectus fermentum lectus, non placerat mi odio sed lorem. Nam eu sollicitudin libero. Nulla interdum urna ut neque dictum, a maximus lorem pellentesque. Aenean a justo id ante varius ullamcorper vel ac nunc. Integer mollis augue eu volutpat tristique.

            Cras tincidunt magna at elit interdum, in aliquam ligula tincidunt. Fusce interdum ac leo eget tincidunt. Cras vel quam non libero suscipit viverra a id nunc. Etiam suscipit risus sed ante finibus tempor. Curabitur euismod leo velit, ac egestas lorem pharetra in. Nulla facilisi. Sed fringilla quam in ipsum venenatis, et egestas sem tincidunt. Aliquam erat volutpat. Mauris ac dolor neque. Cras laoreet justo et velit posuere, nec malesuada justo facilisis. Nam rutrum sit amet dui vitae faucibus. Nulla auctor nec dui eu suscipit. Sed at ipsum lacus. Sed eleifend libero nec dolor tempor ullamcorper.

            Let me know if you'd like more!
          </p>
        </header>
      )}

      {showPool && unansweredQuestions.length > 0 && (
        <div id="pool-container" className="pool-container">
          <h1 className="pool-title">Answer the following questions:</h1>
          {unansweredQuestions.map((q) => (
            <div key={q.id} className="question-block">
              <h2>{q.question}</h2>
              <div className="options-container">
                {q.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="option-button"
                    onClick={() => handleOptionClick(q.question, option)} // Pass correct question ID
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showPool && unansweredQuestions.length === 0 && (
        <div className="no-questions">
          <h1>No Questions Available</h1>
        </div>
      )}
    </div>
  );
}

export default App;
