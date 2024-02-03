import { TouchableOpacityProps } from 'react-native'

import { ExerciseDTO } from '@dtos/ExerciseDTO'

export interface ExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO
}
