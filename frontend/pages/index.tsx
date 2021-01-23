import Head from 'next/head';
import { useEffect, useState } from 'react';
import DropZone from '../components/DropZone';
import styles from '../styles/Home.module.css';

import { useFiles, useUploadFile } from '../services';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const { data, status } = useFiles();

  const { mutateAsync } = useUploadFile();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the upload example</h1>

        {status === 'loading' && <h4>Carregando os arquivos</h4>}
        {/* {status === 'success' && (
          <ul className='p-4 bg-green-700'>
            {data.map((file: any, index) => (
              <li className='text-white font-medium ' key={`file` + index}>
                {index + ` - ` + file.name}
              </li>
            ))}
          </ul>
        )} */}

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
          onClick={async () => {
            let formData = new FormData();

            files.forEach((file) => {
              formData.append('file', file);
            });

            // const { data } = useUploadFile(files[0]);

            try {
              const allFiles = await mutateAsync(files[0]);

              console.log(allFiles, 'a');
            } catch (err) {}
          }}
        >
          Send To API
        </button>
      </main>
    </div>
  );
}
