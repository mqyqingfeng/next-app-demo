import {photos} from '../../../data';

export default function PhotoModal({ params: { id } }) {
  const photo = photos.find((p) => p.id === id)
  return (
    <div className="modal">
      <img style={{width: '200', position: 'fixed', top: '120px'}} src={photo.src} />
    </div>
  )
}