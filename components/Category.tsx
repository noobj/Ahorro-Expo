import { Category } from '@/types/Category.interface';
import { EntryList } from './EntryList';
import { Collapsible } from './Collapsible';

type Props = {
  category: Category;
  // categoryOpened: string;
};

export default function CategoryList(props: Props) {
  return (
    <>
      <Collapsible title={props.category.name} color={props.category.color}>
        {/* <span>{props.category.name}</span>
        <span>{`${props.category.percentage}%`}</span>
        <span>{`${formatToCurrency(props.category.sum)}`}</span> */}
        <EntryList entries={props.category.entries}></EntryList>
      </Collapsible>
    </>
  );
}
