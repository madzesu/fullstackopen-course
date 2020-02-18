import React from 'react';


const Header = props => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};

const Part = props => {
    return (
        <div>
            <p>
                {props.name} {props.exercises}
            </p>
        </div>
    );
};

const Total = props => {
    const total = props.parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0);

    return (
        <div>
            <strong>total of {total} exercises</strong>
        </div>
    );
};

const Course = props => {
    return (
        <div>
            <Header title={props.course.name} />
            {props.course.parts.map(part => (
                <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises}
                />
            ))}
            <Total parts={props.course.parts} />
        </div>
    );
};

export default Course;
