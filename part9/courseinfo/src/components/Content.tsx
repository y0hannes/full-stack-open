import type { ContentProps } from '../types';

const Content = (props: ContentProps) => {
  return (
    <div>
      <p>
        {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
        {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
