import { Category } from '@/types/Category.interface';
import { Picker } from '@react-native-picker/picker';

type Props = {
  categories: Partial<Category>[];
  selectValue: string;
  onValueChange: (...any: any) => any;
};

export default function CategorySelectList({
  categories,
  selectValue,
  onValueChange,
}: Props) {
  return (
    <Picker selectedValue={selectValue} onValueChange={onValueChange}>
      {categories.map((category, i) => (
        <Picker.Item label={category.name} value={category._id} />
      ))}
    </Picker>
  );
}
