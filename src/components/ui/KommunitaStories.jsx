import Stories from 'react-insta-stories';

const KommunitaStories = () => {
    const stories = [
        'https://picsum.photos/1080/1920',
        'https://picsum.photos/1080/1920',
        {
          url: 'https://picsum.photos/1080/1920',
          duration: 5000,
        },
      ];
  return (
    <Stories
			stories={stories}
			defaultInterval={1500}
			width={432}
			height={768}
		/>
  )
}

export default KommunitaStories
