import RadioInput from './RadioInput';

export default function Interest({
  playGames,
  setPlayGames,
  watchMovies,
  setWatchMovies,
  gym,
  setGym,
}) {
  return (
    <div>
      <h2>Do you like to play games?</h2>
      <RadioInput
        text='Yes'
        value={true}
        nameText='games'
        selectedOption={playGames}
        setValue={setPlayGames}
      />
      <RadioInput
        text='No'
        value={false}
        nameText='games'
        selectedOption={playGames}
        setValue={setPlayGames}
      />
      <h2 className='mt-4'>Do you like to watch movies?</h2>
      <RadioInput
        text='Yes'
        value={true}
        nameText='movies'
        selectedOption={watchMovies}
        setValue={setWatchMovies}
      />
      <RadioInput
        text='No'
        value={false}
        nameText='movies'
        selectedOption={watchMovies}
        setValue={setWatchMovies}
      />
      <h2 className='mt-4'>Do you go to gym?</h2>
      <RadioInput
        text='Yes'
        value={true}
        nameText='gym'
        selectedOption={gym}
        setValue={setGym}
      />
      <RadioInput
        text='No'
        value={false}
        nameText='gym'
        selectedOption={gym}
        setValue={setGym}
      />
    </div>
  );
}
