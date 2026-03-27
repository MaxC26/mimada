import { IconStar } from '@tabler/icons-react'

const RatingStars = ({ rating, size = 16, color = '#ffb800' }) => (
  <div className='flex gap-0.4'>
    {[1, 2, 3, 4, 5].map((i) => {
      const isFilled = i <= Math.round(rating)
      return (
        <IconStar
          key={i}
          size={size}
          className={isFilled ? '' : 'text-gray-300'}
          style={isFilled ? { fill: color, color: color } : {}}
          stroke={0}
        />
      )
    })}
  </div>
)

export default RatingStars
