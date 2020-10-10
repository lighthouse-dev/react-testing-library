import React from 'react';

const Render = () => {
  return (
    <div>
      <h1> React Testing Library Lesson</h1>
      <input type="text" />
      <button> Click1 </button>
      <button> Click2 </button>
      <p> Julee </p>
      <span data-testid="copyright" id="testid">
        {' '}
        @React{' '}
      </span>
    </div>
  );
};

export default Render;
