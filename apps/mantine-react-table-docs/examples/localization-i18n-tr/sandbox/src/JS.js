//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_TR } from 'mantine-react-table/locales/tr';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'İlk adı',
  },
  {
    accessorKey: 'lastName',
    header: 'Soy isim',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Yaş',
  },
];

const Example = () => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableEditing
      enablePinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_TR}
    />
  );
};

export default Example;
