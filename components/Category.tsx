import { Category } from '@/types/Category.interface';
import { EntryList } from './EntryList';
import { Collapsible } from './Collapsible';

export default function CategoryList({ category }: { category: Category }) {
  return (
    <>
      <Collapsible
        title={category.name}
        percentage={category.percentage}
        sum={category.sum}
        color={category.color}>
        {/* <span>{props.category.name}</span>
        <span>{`${props.category.percentage}%`}</span>
        <span>{`${formatToCurrency(props.category.sum)}`}</span> */}
        <EntryList entries={category.entries}></EntryList>
      </Collapsible>
    </>
  );
}
