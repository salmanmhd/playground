import Button from './Button';
import './styles.css';

function Comment({
  data,
  hanldeUpVote,
  handleDownVote,
  handleEdit,
  handleReply,
  handleDelete,
}) {
  return (
    <div className='comment-container'>
      <p className='comment text-xl'>{data.comment}</p>
      <p>Votes: {data.votes}</p>
      <p className='mb-3'>
        {data.date}, {data.time}
      </p>
      <Button handleClick={() => hanldeUpVote(data.id)} text={'👍'} />
      <Button text={'👎'} handleClick={() => handleDownVote(data.id)} />
      <Button text={'Reply'} handleClick={() => handleReply(data.id)} />
      <Button text={'Edit'} handleClick={() => handleEdit(data.id)} />
      <Button text={'Delete'} handleClick={() => handleDelete(data.id)} />

      {data?.replies.map((reply, i) => (
        <Comment data={reply} key={i} />
      ))}
    </div>
  );
}

export default Comment;
