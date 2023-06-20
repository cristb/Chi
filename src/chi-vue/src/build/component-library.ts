import { configureCompat } from '@vue/compat';
import { ChiVueLibrary } from 'index';

configureCompat({
  MODE: 3,
});

const exportComponent: ChiVueLibrary = {
  components: {
    ChiCheckbox: () => import(/* webpackChunkName: "checkbox" */ '../components/checkbox/Checkbox'),
    ChiColumnCustomization: () =>
      import(/* webpackChunkName: "column-customization" */ '../components/column-customization/ColumnCustomization'),
    // ChiDataTable: () => import(/* webpackChunkName: "data-table" */ '../components/data-table/DataTable'),
    ChiDataTableBulkActions: () =>
      import(
        /* webpackChunkName: "data-table-bulk-actions" */ '../components/data-table-bulk-actions/DataTableBulkActions'
      ),
    ChiDataTableToolbar: () =>
      import(/* webpackChunkName: "data-table-toolbar" */ '../components/data-table-toolbar/DataTableToolbar'),
    ChiDataTableFilters: () =>
      import(/* webpackChunkName: "data-table-filters" */ '../components/data-table-filters/DataTableFilters'),
    ChiDataTableViews: () =>
      import(/* webpackChunkName: "data-table-views" */ '../components/data-table-views/DataTableViews'),
    ChiDrawer: () => import(/* webpackChunkName: "drawer" */ '../components/drawer/Drawer'),
    ChiExpansionPanel: () =>
      import(/* webpackChunkName: "expansion-panel" */ '../components/expansion-panel/ExpansionPanel'),
    ChiPagination: () => import(/* webpackChunkName: "pagination" */ '../components/pagination/Pagination'),
    ChiSearchInput: () => import(/* webpackChunkName: "search-input" */ '../components/search-input/SearchInput'),
    ChiSaveView: () => import(/* webpackChunkName: "save-view" */ '../components/data-table-save-view/SaveView'),
    ChiTooltip: () => import(/* webpackChunkName: "tooltip" */ '../components/tooltip/Tooltip'),
  },
};

export const library = exportComponent;
