import { Entry } from '@/types/Entry.interface';
import { formatToCurrency } from '@/helper';
import { ThemedText } from './ThemedText';

type Props = {
  entries: Partial<Entry>[];
};

export function EntryList(props: Props) {
  const entryList = props.entries.map(entry => {
    if (entry.amount === undefined) entry.amount = 0;
    const bigAmountColor = entry.amount > 1000 ? 'text-red-400' : '';

    return (
      <ThemedText key={entry._id}>
        {formatToCurrency(entry.amount)} {entry.date} {entry.descr}
      </ThemedText>
    );
  });

  return <>{entryList}</>;
}
