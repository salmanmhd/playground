import { useState } from 'react';
import Comment from './Comment';

const data = [
  {
    id: 1,
    comment: 'This is the first comment',
    votes: 5,
    date: '16/6/2025',
    time: '3:30:00 PM',
    replies: [
      {
        id: 2,
        comment: 'This is the child comment',
        votes: 15,
        date: '2/6/2025',
        time: '3:30:00 PM',
        replies: [
          {
            id: 3,
            comment: 'This is a reply to the child comment',
            votes: 8,
            date: '3/6/2025',
            time: '4:15:00 PM',
            replies: [],
          },
        ],
      },
      {
        id: 4,
        comment: 'Another child comment under the first comment',
        votes: 10,
        date: '5/6/2025',
        time: '1:00:00 PM',
        replies: [],
      },
    ],
  },
  {
    id: 5,
    comment: 'This is the second main comment',
    votes: 12,
    date: '18/6/2025',
    time: '6:45:00 PM',
    replies: [
      {
        id: 6,
        comment: 'A child comment under the second main comment',
        votes: 7,
        date: '19/6/2025',
        time: '10:00:00 AM',
        replies: [
          {
            id: 7,
            comment: 'Replying to the child comment of second main comment',
            votes: 4,
            date: '20/6/2025',
            time: '2:20:00 PM',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    comment: 'This is the third main comment',
    votes: 20,
    date: '20/6/2025',
    time: '9:00:00 AM',
    replies: [],
  },
];

function Main() {
  const [sortBy, setSortBy] = useState('');

  function hanldeUpVote(id) {
    // todo:
    data.votes = data.votes + 1;
    console.log(data.votes);
    // TODO:
  }

  function downVote(id) {
    console.log('down vote', id);
  }

  function handleReply(id) {
    console.log('reply');
    console.log(id);
  }

  function handleEdit(id) {
    console.log('edit');
    console.log(id);
  }

  function handleDelete(id) {
    console.log('delete');
    console.log(id);
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold'>Nested Comment System</h1>
      <form className='flex flex-col gap-4 '>
        <input
          className='rounded-xl h-12 w-90 bg-gray-100 px-4 text-gray-900 '
          type='text'
          placeholder='Add new comment...'
        />
        <button className='rounded-xl bg-gray-900 w-36 h-10'>
          Add Comment
        </button>
      </form>
      <div className='flex mt-8 gap-3 items-center'>
        <p className=''>Sort by:</p>
        <select className='rounded-xl h-10 px-4 bg-slate-900 ' name='' id=''>
          <option value={'newest'}>Newest</option>
          <option value={'oldest'}>Oldest</option>
          <option value={'voted'}>Most Voted</option>
        </select>
      </div>

      {data.map((comment, i) => (
        <Comment data={comment} key={i} hanldeUpVote={hanldeUpVote} />
      ))}
    </div>
  );
}

export default Main;
