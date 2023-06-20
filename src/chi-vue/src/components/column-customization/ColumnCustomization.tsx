import { Emit, Prop, Watch } from 'vue-property-decorator';
import { findComponent, uuid4 } from '@/utils/utils';
import {
  BACKDROP_CLASSES,
  BUTTON_CLASSES,
  CLOSED_CLASS,
  DATA_TABLE_CLASSES,
  DIVIDER_CLASSES,
  UTILITY_CLASSES,
  ICON_CLASS,
  MODAL_CLASSES,
} from '@/constants/classes';
import { DATA_TABLE_EVENTS } from '@/constants/events';
import DataTableToolbar from '@/components/data-table-toolbar/DataTableToolbar';
import { DataTableColumn, DataTableColumnsData } from '@/constants/types';
import ColumnCustomizationContent from './ColumnCustomizationModalContent';
import { checkColumns } from './utils';
import { Component, Vue } from '@/build/vue-wrapper';
import Tooltip from '@/components/tooltip/tooltip';

declare const chi: any;

@Component({})
export default class ColumnCustomization extends Vue {
  @Prop() columnsData!: DataTableColumnsData;

  name = 'ColumnCustomization';

  columnsAvailableColumns?: DataTableColumn[] = [];
  columnsSelectedColumns?: DataTableColumn[] = [];

  key = 0;
  _chiModal: any;
  _ColumnCustomizationContentComponent?: ColumnCustomizationContent;
  _selectedData?: DataTableColumn[];
  _modalId?: string;
  _previousSelected?: DataTableColumn[];

  @Emit(DATA_TABLE_EVENTS.COLUMNS_CHANGE)
  _emitColumnsChange() {
    return this._selectedData;
  }

  _modal() {
    return (
      <div class={`${BACKDROP_CLASSES.BACKDROP} ${CLOSED_CLASS}`}>
        <div class={BACKDROP_CLASSES.WRAPPER}>
          <section
            data-cy="chi-modal"
            id={this._modalId}
            class={`${MODAL_CLASSES.MODAL}`}
            role="dialog"
            aria-label="Customize columns"
            aria-modal="true">
            <header class={MODAL_CLASSES.HEADER}>
              <h2 class={MODAL_CLASSES.TITLE}>Customize columns</h2>
              <button
                class={`${BUTTON_CLASSES.BUTTON} -icon -close`}
                onClick={this._cancelColumnsChange}
                aria-label="Close">
                <div class={BUTTON_CLASSES.CONTENT}>
                  <i class={`${ICON_CLASS} icon-x`} aria-hidden="true"></i>
                </div>
              </button>
            </header>
            <div class={MODAL_CLASSES.CONTENT} key={this.key}>
              <ColumnCustomizationContent
                available-columns={this.columnsAvailableColumns}
                selected-columns={this.columnsSelectedColumns}
              />
            </div>
            <footer class={MODAL_CLASSES.FOOTER}>
              <button
                ref="resetButton"
                class={`
                  ${BUTTON_CLASSES.BUTTON}
                  ${BUTTON_CLASSES.ICON_BUTTON}
                  ${BUTTON_CLASSES.FLAT}
                  ${BUTTON_CLASSES.SIZES.XS}
                  ${UTILITY_CLASSES.PADDING.Y[0]}`}
                onClick={this._reset}
                disabled>
                <div
                  class={`${BUTTON_CLASSES.CONTENT} ${UTILITY_CLASSES.FLEX.COLUMN} ${UTILITY_CLASSES.ALIGN_ITEMS.CENTER}`}>
                  <i
                    aria-hidden="true"
                    class={`${ICON_CLASS} icon-reload -sm--2 ${UTILITY_CLASSES.MARGIN.RIGHT[0]}`}></i>
                  <span
                    class={`${UTILITY_CLASSES.TYPOGRAPHY.TEXT_UPPERCASE} ${UTILITY_CLASSES.TYPOGRAPHY.COLOR.PRIMARY} ${UTILITY_CLASSES.TYPOGRAPHY.SIZE.TWO_XS}`}>
                    Reset
                  </span>
                </div>
              </button>
              <div
                class={`${DIVIDER_CLASSES.DIVIDER} ${DIVIDER_CLASSES.VERTICAL} ${UTILITY_CLASSES.MARGIN.RIGHT[2]}`}></div>
              <button class={`${BUTTON_CLASSES.BUTTON}`} onClick={this._cancelColumnsChange}>
                Cancel
              </button>
              <button
                ref="saveButton"
                onClick={this._submitColumnsChange}
                class={`${BUTTON_CLASSES.BUTTON} ${BUTTON_CLASSES.PRIMARY}`}
                disabled>
                Save
              </button>
            </footer>
          </section>
        </div>
      </div>
    );
  }

  _reset() {
    if (this._ColumnCustomizationContentComponent) {
      this.columnsAvailableColumns = [];
      this.columnsSelectedColumns = [];
      this._selectedData = this.columnsData?.columns.filter((column: DataTableColumn) => column.selected);
      this._processData();
      (this.$refs.saveButton as HTMLButtonElement).disabled = false;
      (this.$refs.resetButton as HTMLButtonElement).disabled = true;
      this.key += 1;
    }
  }

  _submitColumnsChange() {
    this._previousSelected = this._selectedData;
    this._emitColumnsChange();
    (this.$refs.saveButton as HTMLButtonElement).disabled = true;
    this._chiModal.hide();
  }

  _cancelColumnsChange() {
    const originalSelectedColumns = this.columnsData?.columns.filter((column: DataTableColumn) => column.selected);

    if (this._previousSelected) {
      this._selectedData = this._previousSelected;
      this.columnsSelectedColumns = this._selectedData;
      this.columnsAvailableColumns = this.columnsAvailableColumns?.filter(
        (columnAvailable: DataTableColumn) =>
          !this.columnsSelectedColumns?.some(
            (columnSelected: DataTableColumn) => columnAvailable.name === columnSelected.name
          )
      );

      if (originalSelectedColumns) {
        (this.$refs.resetButton as HTMLButtonElement).disabled = checkColumns(
          originalSelectedColumns,
          this._previousSelected
        );
      }
    }

    (this.$refs.saveButton as HTMLButtonElement).disabled = true;
    this._chiModal.hide();
    this.key += 1;
  }

  beforeCreate() {
    this.columnsAvailableColumns = [];
    this.columnsSelectedColumns = [];
  }

  created() {
    this._processData();
    this._modalId = `modal-${uuid4()}`;
  }

  @Watch('columnsData')
  _processData() {
    this.columnsData.columns.forEach((column: DataTableColumn) => {
      if (column.selected && this.columnsSelectedColumns) {
        this.columnsSelectedColumns.push(column);
      } else {
        if (this.columnsAvailableColumns) {
          this.columnsAvailableColumns.push(column);
        }
      }
    });
  }

  mounted() {
    const dataTableToolbarComponent = findComponent(this, 'DataTableToolbar');
    const modalButton = this.$refs.modalButton;

    if (dataTableToolbarComponent) {
      (dataTableToolbarComponent as DataTableToolbar)._columns = this;
    }
    this._chiModal = chi.modal(modalButton);
    this._watchContentComponentChanges();
  }

  updated() {
    this._watchContentComponentChanges();
  }

  _watchContentComponentChanges() {
    if (this._ColumnCustomizationContentComponent) {
      // TODO: Put again
      // this._ColumnCustomizationContentComponent.emitter.on(
      //   DATA_TABLE_EVENTS.COLUMNS_CHANGE,
      //   (ev: DataTableColumn[]) => {
      //     const originalSelectedColumns = this.columnsData?.columns.filter(
      //       (column: DataTableColumn) => column.selected
      //     );
      //     if (!this._previousSelected) {
      //       this._previousSelected = originalSelectedColumns;
      //     }
      //     debugger;
      //     this._selectedData = ev;
      //     if (this._previousSelected && originalSelectedColumns) {
      //       (this.$refs.saveButton as HTMLButtonElement).disabled = checkColumns(this._previousSelected, ev);
      //       (this.$refs.resetButton as HTMLButtonElement).disabled = checkColumns(originalSelectedColumns, ev);
      //     }
      //   }
      // );
    }
  }
  render() {
    const modalButton = (
      <button
        ref="modalButton"
        data-cy="chi-modal__trigger"
        data-target={`#${this._modalId}`}
        class={`
          ${BUTTON_CLASSES.BUTTON}
          ${BUTTON_CLASSES.ICON_BUTTON}
          ${BUTTON_CLASSES.FLAT}
          `}>
        <div class={BUTTON_CLASSES.CONTENT}>
          <i class={`${ICON_CLASS} icon-table-column-settings`} aria-hidden="true" />
        </div>
      </button>
    );
    const modalTooltip = <Tooltip message="Customize columns">{modalButton}</Tooltip>;
    const modal = this._modal();

    return (
      <div class={DATA_TABLE_CLASSES.COLUMNS}>
        {modalTooltip}
        {modal}
      </div>
    );
  }
}
