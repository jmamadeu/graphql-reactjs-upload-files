import Head from 'next/head';
import { useState } from 'react';
import DropZone from '../components/DropZone';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the upload example</h1>

        <DropZone
          selectedFiles={(files) => {
            setFiles((oldFiles) => [...oldFiles, ...files]);
          }}
        />

        {files.length > 0 && (
          <>
            <h4 className='text-base'>Files list</h4>

            <ul className='p-4 bg-green-700'>
              {files.map((file, index) => (
                <li className='text-white font-medium ' key={`file` + index}>
                  {index + ` - ` + file.name}
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          type='button'
          disabled={files.length === 0}
          className='bg-blue-600 p-2 text-white text-medium mt-2 outline-none'
          onClick={() => {
            let formData = new FormData();

            files.forEach((file) => {
              formData.append('file', file);
            });

            console.log(formData.getAll('file'));
          }}
        >
          Send To API
        </button>
      </main>
    </div>
  );
}
