
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

interface IFeedItem {
  id: string;
  media_type: "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";
  media_url: string;
  permalink: string;
}

export default function InstaFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);
  const currentReq = useRef(false);

  async function getInstaFeed() {
    if (currentReq.current) {
      return;
    }
    currentReq.current = true;

    const token = import.meta.env.VITE_INSTA_TOKEN;
    const url = 'http://localhost:3001/posts';
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data: IFeedItem[] = await response.json();
      setFeedList(data);
      console.log("Carregando JSON");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getInstaFeed();
    return () => {
      currentReq.current = false; // Garante que a flag seja resetada ao desmontar o componente
    };
  }, []);

  return (
    <section className={styles.container}>
      {feedList.map(item => (
        <a key={item.id} href={item.permalink} target="_blank" className={styles.item}>
          {["IMAGE", "CAROUSEL_ALBUM"].includes(item.media_type) ? <img src={item.media_url} alt={item.id} /> : (
            <video controls>
              <source src={item.media_url} type="video/mp4" />
            </video>
          )}
        </a>
      ))}
    </section>
  );
}
