import { useEffect, useState } from 'react';
import {
  outer_container,
  inner_container,
  progress_text,
} from './ProgressBar.module.css';

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimiatedProgress] = useState(0);

  useEffect(() => {
    setAnimiatedProgress(progress);
  }, [progress]);

  return (
    <div>
      <p>Progress Bar:</p>
      <div
        className={outer_container}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={inner_container}
          style={{
            color: progress > 2 ? 'white' : 'black',
            transform: `translateX(${animatedProgress - 100}%)`,
          }}
        ></div>
        <span className={progress_text}>{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
