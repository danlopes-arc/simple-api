import axios from 'axios';
import { FC, useEffect, useState } from 'react';

export const App: FC = () => {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await axios.get<string>('api/message')
      setMessage(res.data)
    }
    fetchMessage()
  }, [])


  return (
    <div>
      <h1>Simple App</h1>
      <p>Just a simple app</p>
      <p>
        {message == null ? 'loading message...' : message}
      </p>
    </div>
  );
}
