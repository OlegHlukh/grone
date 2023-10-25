import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { ComplexityLevel, GameState } from 'types';
import Input from './ui/input.tsx';
import { addUserName, initUser } from 'store/user';
import { UserInitBody } from 'api';
import { useAppDispatch } from 'hooks';
import { Button } from './ui/button.tsx';
import { setComplexityLevel, setIsLoading, updateState } from 'store/game';
import { setWallHeight } from 'store/cave';

const complexityOption = [
  { value: ComplexityLevel.VeryEasy, label: 'Very easy' },
  { value: ComplexityLevel.Easy, label: 'Easy' },
  { value: ComplexityLevel.Moderate, label: 'Moderate' },
  { value: ComplexityLevel.Intermediate, label: 'Intermediate' },
  { value: ComplexityLevel.Challenging, label: 'Challenging' },
  { value: ComplexityLevel.Difficult, label: 'Difficult' },
  { value: ComplexityLevel.Hard, label: 'Hard' },
  { value: ComplexityLevel.VeryHard, label: 'Very Hard' },
  { value: ComplexityLevel.Expert, label: 'Expert' },
  { value: ComplexityLevel.Master, label: 'Master' },
  { value: ComplexityLevel.Legendary, label: 'God of War' },
];

//todo refactor
export const NewGameForm: FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [complexity, setComplexity] = useState(ComplexityLevel.VeryEasy);
  const [nameError, setNameError] = useState('');

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    if (e.target.value) {
      setNameError('');
    }
  }, []);

  const handleComplexityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const complexity = parseInt(e.target.value) as ComplexityLevel;

      setComplexity(complexity);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setNameError('Name is required');

      return;
    }

    const body: UserInitBody = {
      name,
      complexity,
    };

    if (complexity >= ComplexityLevel.Expert) {
      dispatch(setWallHeight(20));
    }

    dispatch(initUser(body));
    dispatch(updateState(GameState.Playing));
    dispatch(setIsLoading(true));
    dispatch(setComplexityLevel(complexity));
    dispatch(addUserName(name));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label={'Name'}
        value={name}
        onChange={handleNameChange}
        placeholder={'Enter you name'}
        error={nameError}
      />
      <SelectWrapper>
        <select value={complexity} onChange={handleComplexityChange}>
          {complexityOption.map((el) => (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          ))}
        </select>
      </SelectWrapper>
      <Button text={'Start New Game'} />
    </Form>
  );
};

const Form = styled.form`
  display: grid;
  gap: 20px;

  & select {
    border-radius: 0;
    padding: 5px;
    font-size: 18px;
    width: 100%;
  }
`;

const SelectWrapper = styled.div`
  width: 100%;

  & > select {
    width: 100%;
  }
`;
