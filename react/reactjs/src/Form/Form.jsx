import { useState } from 'react';
import SettingsForm from './SettingsForm';
import ProfileForm from './ProfileForm';
import TabButton from './TabButton';
import Interest from './Interest';

export default function Form() {
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [playGames, setPlayGames] = useState('');
  const [watchMovies, setWatchMovies] = useState('');
  const [gym, setGym] = useState('');

  const [publicProfile, setPublicProfile] = useState(false);

  function handleTabButton(text) {
    setActiveTab(text);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !age ||
      playGames === '' ||
      watchMovies === '' ||
      gym === '' ||
      publicProfile === ''
    ) {
      alert('form not submitted, Please fill all the fields');
      return;
    }
    setShowSubmitted((prev) => !prev);
    alert('form submitted');
  }

  return (
    <div className='flex  align-center h-full w-full'>
      <div className='rounded-md ml-10 mt-10 border border-gray-400  flex flex-col h-[35rem] w-[35rem]'>
        <div className='mt-8 ml-4'>
          <TabButton
            onTabChange={handleTabButton}
            text='Profile'
            isActive={activeTab === 'profile'}
          />
          <TabButton
            onTabChange={handleTabButton}
            text='Interest'
            isActive={activeTab === 'interest'}
          />
          <TabButton
            onTabChange={handleTabButton}
            text='Settings'
            isActive={activeTab === 'settings'}
          />
        </div>
        <form className='w-full flex-1 flex flex-col justify-between py-4 '>
          <div className='ml-4'>
            {activeTab === 'profile' && (
              <ProfileForm
                name={name}
                age={age}
                email={email}
                setName={setName}
                setAge={setAge}
                setEmail={setEmail}
              />
            )}
            {activeTab === 'interest' && (
              <Interest
                playGames={playGames}
                setPlayGames={setPlayGames}
                watchMovies={watchMovies}
                setWatchMovies={setWatchMovies}
                gym={gym}
                setGym={setGym}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsForm
                handleSubmit={handleFormSubmit}
                value={publicProfile}
                setValue={setPublicProfile}
              />
            )}
          </div>
        </form>
      </div>
      {showSubmitted && (
        <div className='rounded-md ml-10 mt-10 border gap-y-4 p-4 border-gray-400  flex flex-col h-[35rem] w-[35rem]'>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Play Games: {playGames ? 'Yes' : 'No'}</p>
          <p>Watch Movies: {watchMovies ? 'Yes' : 'No'}</p>
          <p>Gym: {gym ? 'Yes' : 'No'}</p>
          <p>Public Profile: {publicProfile ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
