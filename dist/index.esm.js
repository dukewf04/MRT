import { flexRender as flexRender$1, createRow as createRow$1, sortingFns, aggregationFns, filterFns, getCoreRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState, useReducer, useRef, useEffect, useCallback, memo, useTransition, Fragment as Fragment$1, useLayoutEffect } from 'react';
import { compareItems, rankItem, rankings } from '@tanstack/match-sorter-utils';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { lighten, darken, alpha, useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import LastPageIcon from '@mui/icons-material/LastPage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SortIcon from '@mui/icons-material/Sort';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import highlightWords from 'highlight-words';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FormHelperText from '@mui/material/FormHelperText';
import Slider from '@mui/material/Slider';
import Grow from '@mui/material/Grow';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import TableSortLabel from '@mui/material/TableSortLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select from '@mui/material/Select';
import Fade from '@mui/material/Fade';
import Switch from '@mui/material/Switch';

const getColumnId = (columnDef) => { var _a, _b, _c, _d; return (_d = (_a = columnDef.id) !== null && _a !== void 0 ? _a : (_c = (_b = columnDef.accessorKey) === null || _b === void 0 ? void 0 : _b.toString) === null || _c === void 0 ? void 0 : _c.call(_b)) !== null && _d !== void 0 ? _d : columnDef.header; };
const getAllLeafColumnDefs = (columns) => {
    const allLeafColumnDefs = [];
    const getLeafColumns = (cols) => {
        cols.forEach((col) => {
            if (col.columns) {
                getLeafColumns(col.columns);
            }
            else {
                allLeafColumnDefs.push(col);
            }
        });
    };
    getLeafColumns(columns);
    return allLeafColumnDefs;
};
const prepareColumns = ({ columnDefs, tableOptions, }) => {
    const { aggregationFns = {}, defaultDisplayColumn, filterFns = {}, sortingFns = {}, state: { columnFilterFns = {} } = {}, } = tableOptions;
    return columnDefs.map((columnDef) => {
        var _a, _b;
        //assign columnId
        if (!columnDef.id)
            columnDef.id = getColumnId(columnDef);
        //assign columnDefType
        if (!columnDef.columnDefType)
            columnDef.columnDefType = 'data';
        if ((_a = columnDef.columns) === null || _a === void 0 ? void 0 : _a.length) {
            columnDef.columnDefType = 'group';
            //recursively prepare columns if this is a group column
            columnDef.columns = prepareColumns({
                columnDefs: columnDef.columns,
                tableOptions,
            });
        }
        else if (columnDef.columnDefType === 'data') {
            //assign aggregationFns if multiple aggregationFns are provided
            if (Array.isArray(columnDef.aggregationFn)) {
                const aggFns = columnDef.aggregationFn;
                columnDef.aggregationFn = (columnId, leafRows, childRows) => aggFns.map((fn) => { var _a; return (_a = aggregationFns[fn]) === null || _a === void 0 ? void 0 : _a.call(aggregationFns, columnId, leafRows, childRows); });
            }
            //assign filterFns
            if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
                columnDef.filterFn =
                    (_b = filterFns[columnFilterFns[columnDef.id]]) !== null && _b !== void 0 ? _b : filterFns.fuzzy;
                columnDef._filterFn =
                    columnFilterFns[columnDef.id];
            }
            //assign sortingFns
            if (Object.keys(sortingFns).includes(columnDef.sortingFn)) {
                // @ts-ignore
                columnDef.sortingFn = sortingFns[columnDef.sortingFn];
            }
        }
        else if (columnDef.columnDefType === 'display') {
            columnDef = Object.assign(Object.assign({}, defaultDisplayColumn), columnDef);
        }
        return columnDef;
    });
};
const reorderColumn = (draggedColumn, targetColumn, columnOrder) => {
    if (draggedColumn.getCanPin()) {
        draggedColumn.pin(targetColumn.getIsPinned());
    }
    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(newColumnOrder.indexOf(targetColumn.id), 0, newColumnOrder.splice(newColumnOrder.indexOf(draggedColumn.id), 1)[0]);
    return newColumnOrder;
};
const getDefaultColumnFilterFn = (columnDef) => {
    const { filterVariant } = columnDef;
    if (filterVariant === 'multi-select')
        return 'arrIncludesSome';
    if (filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.includes('range'))
        return 'betweenInclusive';
    if (filterVariant === 'select' || filterVariant === 'checkbox')
        return 'equals';
    return 'fuzzy';
};
const getColumnFilterInfo = ({ header, table, }) => {
    var _a;
    const { options: { columnFilterModeOptions }, } = table;
    const { column } = header;
    const { columnDef } = column;
    const { filterVariant } = columnDef;
    const isDateFilter = !!((filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.startsWith('date')) || (filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.startsWith('time')));
    const isAutocompleteFilter = filterVariant === 'autocomplete';
    const isRangeFilter = (filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.includes('range')) ||
        ['between', 'betweenInclusive', 'inNumberRange'].includes(columnDef._filterFn);
    const isSelectFilter = filterVariant === 'select';
    const isMultiSelectFilter = filterVariant === 'multi-select';
    const isTextboxFilter = ['autocomplete', 'text'].includes(filterVariant) ||
        (!isSelectFilter && !isMultiSelectFilter);
    const currentFilterOption = columnDef._filterFn;
    const allowedColumnFilterOptions = (_a = columnDef === null || columnDef === void 0 ? void 0 : columnDef.columnFilterModeOptions) !== null && _a !== void 0 ? _a : columnFilterModeOptions;
    const facetedUniqueValues = column.getFacetedUniqueValues();
    return {
        allowedColumnFilterOptions,
        currentFilterOption,
        facetedUniqueValues,
        isAutocompleteFilter,
        isDateFilter,
        isMultiSelectFilter,
        isRangeFilter,
        isSelectFilter,
        isTextboxFilter,
    };
};
const useDropdownOptions = ({ header, table, }) => {
    const { column } = header;
    const { columnDef } = column;
    const { facetedUniqueValues, isAutocompleteFilter, isMultiSelectFilter, isSelectFilter, } = getColumnFilterInfo({ header, table });
    return useMemo(() => {
        var _a;
        return (_a = columnDef.filterSelectOptions) !== null && _a !== void 0 ? _a : ((isSelectFilter || isMultiSelectFilter || isAutocompleteFilter) &&
            facetedUniqueValues
            ? Array.from(facetedUniqueValues.keys())
                .filter((value) => value !== null && value !== undefined)
                .sort((a, b) => a.localeCompare(b))
            : undefined);
    }, [
        columnDef.filterSelectOptions,
        facetedUniqueValues,
        isMultiSelectFilter,
        isSelectFilter,
    ]);
};

const flexRender = flexRender$1;
function createMRTColumnHelper() {
    return {
        accessor: (accessor, column) => {
            return typeof accessor === 'function'
                ? Object.assign(Object.assign({}, column), { accessorFn: accessor })
                : Object.assign(Object.assign({}, column), { accessorKey: accessor });
        },
        display: (column) => column,
        group: (column) => column,
    };
}
const createRow = (table, originalRow, rowIndex = -1, depth = 0, subRows, parentId) => createRow$1(table, 'mrt-row-create', originalRow !== null && originalRow !== void 0 ? originalRow : Object.assign({}, ...getAllLeafColumnDefs(table.options.columns).map((col) => ({
    [getColumnId(col)]: '',
}))), rowIndex, depth, subRows, parentId);

const parseFromValuesOrFunc = (fn, arg) => (fn instanceof Function ? fn(arg) : fn);
const getValueAndLabel = (option) => {
    var _a, _b, _c;
    let label = '';
    let value = '';
    if (option) {
        if (typeof option !== 'object') {
            label = option;
            value = option;
        }
        else {
            label = (_b = (_a = option.label) !== null && _a !== void 0 ? _a : option.text) !== null && _b !== void 0 ? _b : option.value;
            value = (_c = option.value) !== null && _c !== void 0 ? _c : label;
        }
    }
    return { label, value };
};

const isCellEditable = ({ cell, table, }) => {
    const { enableEditing } = table.options;
    const { column: { columnDef }, row, } = cell;
    return (!cell.getIsPlaceholder() &&
        parseFromValuesOrFunc(enableEditing, row) &&
        parseFromValuesOrFunc(columnDef.enableEditing, row) !== false);
};
const openEditingCell = ({ cell, table, }) => {
    const { options: { editDisplayMode }, refs: { editInputRefs }, } = table;
    const { column } = cell;
    if (isCellEditable({ cell, table }) && editDisplayMode === 'cell') {
        table.setEditingCell(cell);
        queueMicrotask(() => {
            var _a;
            const textField = editInputRefs.current[column.id];
            if (textField) {
                textField.focus();
                (_a = textField.select) === null || _a === void 0 ? void 0 : _a.call(textField);
            }
        });
    }
};

function defaultDisplayColumnProps({ header, id, size, tableOptions, }) {
    const { defaultDisplayColumn, displayColumnDefOptions, localization } = tableOptions;
    return Object.assign(Object.assign(Object.assign(Object.assign({}, defaultDisplayColumn), { header: header ? localization[header] : '', size }), displayColumnDefOptions === null || displayColumnDefOptions === void 0 ? void 0 : displayColumnDefOptions[id]), { id });
}
const showRowPinningColumn = (tableOptions) => {
    const { enableRowPinning, rowPinningDisplayMode } = tableOptions;
    return !!(enableRowPinning && !(rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.startsWith('select')));
};
const showRowDragColumn = (tableOptions) => {
    const { enableRowDragging, enableRowOrdering } = tableOptions;
    return !!(enableRowDragging || enableRowOrdering);
};
const showRowExpandColumn = (tableOptions) => {
    const { enableExpanding, enableGrouping, renderDetailPanel, state: { grouping }, } = tableOptions;
    return !!(enableExpanding ||
        (enableGrouping && (grouping === null || grouping === void 0 ? void 0 : grouping.length)) ||
        renderDetailPanel);
};
const showRowActionsColumn = (tableOptions) => {
    const { createDisplayMode, editDisplayMode, enableEditing, enableRowActions, state: { creatingRow }, } = tableOptions;
    return !!(enableRowActions ||
        (creatingRow && createDisplayMode === 'row') ||
        (enableEditing && ['modal', 'row'].includes(editDisplayMode !== null && editDisplayMode !== void 0 ? editDisplayMode : '')));
};
const showRowSelectionColumn = (tableOptions) => !!tableOptions.enableRowSelection;
const showRowNumbersColumn = (tableOptions) => !!tableOptions.enableRowNumbers;
const showRowSpacerColumn = (tableOptions) => tableOptions.layoutMode === 'grid-no-grow';
const getLeadingDisplayColumnIds = (tableOptions) => [
    showRowPinningColumn(tableOptions) && 'mrt-row-pin',
    showRowDragColumn(tableOptions) && 'mrt-row-drag',
    tableOptions.positionActionsColumn === 'first' &&
        showRowActionsColumn(tableOptions) &&
        'mrt-row-actions',
    tableOptions.positionExpandColumn === 'first' &&
        showRowExpandColumn(tableOptions) &&
        'mrt-row-expand',
    showRowSelectionColumn(tableOptions) && 'mrt-row-select',
    showRowNumbersColumn(tableOptions) && 'mrt-row-numbers',
].filter(Boolean);
const getTrailingDisplayColumnIds = (tableOptions) => [
    tableOptions.positionActionsColumn === 'last' &&
        showRowActionsColumn(tableOptions) &&
        'mrt-row-actions',
    tableOptions.positionExpandColumn === 'last' &&
        showRowExpandColumn(tableOptions) &&
        'mrt-row-expand',
    showRowSpacerColumn(tableOptions) && 'mrt-row-spacer',
].filter(Boolean);
const getDefaultColumnOrderIds = (tableOptions, reset = false) => {
    const { state: { columnOrder: currentColumnOrderIds = [] }, } = tableOptions;
    const leadingDisplayColIds = getLeadingDisplayColumnIds(tableOptions);
    const trailingDisplayColIds = getTrailingDisplayColumnIds(tableOptions);
    const defaultColumnDefIds = getAllLeafColumnDefs(tableOptions.columns).map((columnDef) => getColumnId(columnDef));
    let allLeafColumnDefIds = reset
        ? defaultColumnDefIds
        : Array.from(new Set([...currentColumnOrderIds, ...defaultColumnDefIds]));
    allLeafColumnDefIds = allLeafColumnDefIds.filter((colId) => !leadingDisplayColIds.includes(colId) &&
        !trailingDisplayColIds.includes(colId));
    return [
        ...leadingDisplayColIds,
        ...allLeafColumnDefIds,
        ...trailingDisplayColIds,
    ];
};

const fuzzy$1 = (rowA, rowB, columnId) => {
    let dir = 0;
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(rowA.columnFiltersMeta[columnId], rowB.columnFiltersMeta[columnId]);
    }
    // Provide a fallback for when the item ranks are equal
    return dir === 0
        ? sortingFns.alphanumeric(rowA, rowB, columnId)
        : dir;
};
const MRT_SortingFns = Object.assign(Object.assign({}, sortingFns), { fuzzy: fuzzy$1 });
const rankGlobalFuzzy = (rowA, rowB) => Math.max(...Object.values(rowB.columnFiltersMeta).map((v) => v.rank)) -
    Math.max(...Object.values(rowA.columnFiltersMeta).map((v) => v.rank));

const getMRT_Rows = (table, all) => {
    const { getCenterRows, getPrePaginationRowModel, getRowModel, getState, getTopRows, options: { createDisplayMode, enablePagination, enableRowPinning, manualPagination, positionCreatingRow, rowPinningDisplayMode, }, } = table;
    const { creatingRow, pagination } = getState();
    const isRankingRows = getIsRankingRows(table);
    let rows = [];
    if (!isRankingRows) {
        rows =
            !enableRowPinning || (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky'))
                ? all
                    ? getPrePaginationRowModel().rows
                    : getRowModel().rows
                : getCenterRows();
    }
    else {
        // fuzzy ranking adjustments
        rows = getPrePaginationRowModel().rows.sort((a, b) => rankGlobalFuzzy(a, b));
        if (enablePagination && !manualPagination && !all) {
            const start = pagination.pageIndex * pagination.pageSize;
            rows = rows.slice(start, start + pagination.pageSize);
        }
        if (enableRowPinning && !(rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky'))) {
            // "re-center-ize" the rows (no top or bottom pinned rows unless sticky)
            rows = rows.filter((row) => !row.getIsPinned());
        }
    }
    // row pinning adjustments
    if (enableRowPinning && (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky'))) {
        const centerPinnedRowIds = rows
            .filter((row) => row.getIsPinned())
            .map((r) => r.id);
        rows = [
            ...getTopRows().filter((row) => !centerPinnedRowIds.includes(row.id)),
            ...rows,
        ];
    }
    // blank inserted creating row adjustments
    if (positionCreatingRow !== undefined &&
        creatingRow &&
        createDisplayMode === 'row') {
        const creatingRowIndex = !isNaN(+positionCreatingRow)
            ? +positionCreatingRow
            : positionCreatingRow === 'top'
                ? 0
                : rows.length;
        rows = [
            ...rows.slice(0, creatingRowIndex),
            creatingRow,
            ...rows.slice(creatingRowIndex),
        ];
    }
    return rows;
};
const getCanRankRows = (table) => {
    const { getState, options: { enableGlobalFilterRankedResults, manualExpanding, manualFiltering, manualGrouping, manualSorting, }, } = table;
    const { expanded, globalFilterFn } = getState();
    return (!manualExpanding &&
        !manualFiltering &&
        !manualGrouping &&
        !manualSorting &&
        enableGlobalFilterRankedResults &&
        globalFilterFn === 'fuzzy' &&
        expanded !== true &&
        !Object.values(expanded).some(Boolean));
};
const getIsRankingRows = (table) => {
    const { globalFilter, sorting } = table.getState();
    return (getCanRankRows(table) &&
        globalFilter &&
        !Object.values(sorting).some(Boolean));
};
const getIsRowSelected = ({ row, table, }) => {
    const { options: { enableRowSelection }, } = table;
    return (row.getIsSelected() ||
        (parseFromValuesOrFunc(enableRowSelection, row) &&
            row.getCanSelectSubRows() &&
            row.getIsAllSubRowsSelected()));
};
const getMRT_RowSelectionHandler = ({ row, staticRowIndex = 0, table, }) => (event, value) => {
    var _a;
    const { getState, options: { enableBatchRowSelection, enableMultiRowSelection, enableRowPinning, manualPagination, rowPinningDisplayMode, }, refs: { lastSelectedRowId: lastSelectedRowId }, } = table;
    const { pagination: { pageIndex, pageSize }, } = getState();
    const paginationOffset = manualPagination ? 0 : pageSize * pageIndex;
    const wasCurrentRowChecked = getIsRowSelected({ row, table });
    // toggle selection of this row
    row.toggleSelected(value !== null && value !== void 0 ? value : !wasCurrentRowChecked);
    const changedRowIds = new Set([row.id]);
    // if shift key is pressed, select all rows between last selected and this one
    if (enableBatchRowSelection &&
        enableMultiRowSelection &&
        event.nativeEvent.shiftKey &&
        lastSelectedRowId.current !== null) {
        const rows = getMRT_Rows(table, true);
        const lastIndex = rows.findIndex((r) => r.id === lastSelectedRowId.current);
        if (lastIndex !== -1) {
            const isLastIndexChecked = getIsRowSelected({
                row: rows === null || rows === void 0 ? void 0 : rows[lastIndex],
                table,
            });
            const currentIndex = staticRowIndex + paginationOffset;
            const [start, end] = lastIndex < currentIndex
                ? [lastIndex, currentIndex]
                : [currentIndex, lastIndex];
            // toggle selection of all rows between last selected and this one
            // but only if the last selected row is not the same as the current one
            if (wasCurrentRowChecked !== isLastIndexChecked) {
                for (let i = start; i <= end; i++) {
                    rows[i].toggleSelected(!wasCurrentRowChecked);
                    changedRowIds.add(rows[i].id);
                }
            }
        }
    }
    // record the last selected row id
    lastSelectedRowId.current = row.id;
    // if all sub rows were selected, unselect them
    if (row.getCanSelectSubRows() && row.getIsAllSubRowsSelected()) {
        (_a = row.subRows) === null || _a === void 0 ? void 0 : _a.forEach((r) => r.toggleSelected(false));
    }
    if (enableRowPinning && (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('select'))) {
        changedRowIds.forEach((rowId) => {
            const rowToTogglePin = table.getRow(rowId);
            rowToTogglePin.pin(!wasCurrentRowChecked //was not previously pinned or selected
                ? (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('bottom'))
                    ? 'bottom'
                    : 'top'
                : false);
        });
    }
};
const getMRT_SelectAllHandler = ({ table }) => (event, value, forceAll) => {
    const { options: { enableRowPinning, rowPinningDisplayMode, selectAllMode }, refs: { lastSelectedRowId }, } = table;
    selectAllMode === 'all' || forceAll
        ? table.toggleAllRowsSelected(value !== null && value !== void 0 ? value : event.target.checked)
        : table.toggleAllPageRowsSelected(value !== null && value !== void 0 ? value : event.target.checked);
    if (enableRowPinning && (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('select'))) {
        table.setRowPinning({ bottom: [], top: [] });
    }
    lastSelectedRowId.current = null;
};

const MRT_AggregationFns = Object.assign({}, aggregationFns);

const fuzzy = (row, columnId, filterValue, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), filterValue, {
        threshold: rankings.MATCHES,
    });
    addMeta(itemRank);
    return itemRank.passed;
};
fuzzy.autoRemove = (val) => !val;
const contains = (row, id, filterValue) => row
    .getValue(id)
    .toString()
    .toLowerCase()
    .trim()
    .includes(filterValue.toString().toLowerCase().trim());
contains.autoRemove = (val) => !val;
const startsWith = (row, id, filterValue) => row
    .getValue(id)
    .toString()
    .toLowerCase()
    .trim()
    .startsWith(filterValue.toString().toLowerCase().trim());
startsWith.autoRemove = (val) => !val;
const endsWith = (row, id, filterValue) => row
    .getValue(id)
    .toString()
    .toLowerCase()
    .trim()
    .endsWith(filterValue.toString().toLowerCase().trim());
endsWith.autoRemove = (val) => !val;
const equals = (row, id, filterValue) => row.getValue(id).toString().toLowerCase().trim() ===
    (filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString().toLowerCase().trim());
equals.autoRemove = (val) => !val;
const notEquals = (row, id, filterValue) => row.getValue(id).toString().toLowerCase().trim() !==
    filterValue.toString().toLowerCase().trim();
notEquals.autoRemove = (val) => !val;
const greaterThan = (row, id, filterValue) => !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) > +filterValue
    : row.getValue(id).toString().toLowerCase().trim() >
        (filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString().toLowerCase().trim());
greaterThan.autoRemove = (val) => !val;
const greaterThanOrEqualTo = (row, id, filterValue) => equals(row, id, filterValue) || greaterThan(row, id, filterValue);
greaterThanOrEqualTo.autoRemove = (val) => !val;
const lessThan = (row, id, filterValue) => !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) < +filterValue
    : row.getValue(id).toString().toLowerCase().trim() <
        (filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString().toLowerCase().trim());
lessThan.autoRemove = (val) => !val;
const lessThanOrEqualTo = (row, id, filterValue) => equals(row, id, filterValue) || lessThan(row, id, filterValue);
lessThanOrEqualTo.autoRemove = (val) => !val;
const between = (row, id, filterValues) => (['', undefined].includes(filterValues[0]) ||
    greaterThan(row, id, filterValues[0])) &&
    ((!isNaN(+filterValues[0]) &&
        !isNaN(+filterValues[1]) &&
        +filterValues[0] > +filterValues[1]) ||
        ['', undefined].includes(filterValues[1]) ||
        lessThan(row, id, filterValues[1]));
between.autoRemove = (val) => !val;
const betweenInclusive = (row, id, filterValues) => (['', undefined].includes(filterValues[0]) ||
    greaterThanOrEqualTo(row, id, filterValues[0])) &&
    ((!isNaN(+filterValues[0]) &&
        !isNaN(+filterValues[1]) &&
        +filterValues[0] > +filterValues[1]) ||
        ['', undefined].includes(filterValues[1]) ||
        lessThanOrEqualTo(row, id, filterValues[1]));
betweenInclusive.autoRemove = (val) => !val;
const empty = (row, id, _filterValue) => !row.getValue(id).toString().trim();
empty.autoRemove = (val) => !val;
const notEmpty = (row, id, _filterValue) => !!row.getValue(id).toString().trim();
notEmpty.autoRemove = (val) => !val;
const MRT_FilterFns = Object.assign(Object.assign({}, filterFns), { between,
    betweenInclusive,
    contains,
    empty,
    endsWith,
    equals,
    fuzzy,
    greaterThan,
    greaterThanOrEqualTo,
    lessThan,
    lessThanOrEqualTo,
    notEmpty,
    notEquals,
    startsWith });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const MRT_EditActionButtons = (_a) => {
    var { row, table, variant = 'icon' } = _a, rest = __rest(_a, ["row", "table", "variant"]);
    const { getState, options: { icons: { CancelIcon, SaveIcon }, localization, onCreatingRowCancel, onCreatingRowSave, onEditingRowCancel, onEditingRowSave, }, refs: { editInputRefs }, setCreatingRow, setEditingRow, } = table;
    const { creatingRow, editingRow, isSaving } = getState();
    const isCreating = (creatingRow === null || creatingRow === void 0 ? void 0 : creatingRow.id) === row.id;
    const isEditing = (editingRow === null || editingRow === void 0 ? void 0 : editingRow.id) === row.id;
    const handleCancel = () => {
        if (isCreating) {
            onCreatingRowCancel === null || onCreatingRowCancel === void 0 ? void 0 : onCreatingRowCancel({ row, table });
            setCreatingRow(null);
        }
        else if (isEditing) {
            onEditingRowCancel === null || onEditingRowCancel === void 0 ? void 0 : onEditingRowCancel({ row, table });
            setEditingRow(null);
        }
        row._valuesCache = {}; //reset values cache
    };
    const handleSubmitRow = () => {
        var _a;
        //look for auto-filled input values
        (_a = Object.values(editInputRefs === null || editInputRefs === void 0 ? void 0 : editInputRefs.current)
            .filter((inputRef) => { var _a, _b; return row.id === ((_b = (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.name) === null || _a === void 0 ? void 0 : _a.split('_')) === null || _b === void 0 ? void 0 : _b[0]); })) === null || _a === void 0 ? void 0 : _a.forEach((input) => {
            if (input.value !== undefined &&
                Object.hasOwn(row === null || row === void 0 ? void 0 : row._valuesCache, input.name)) {
                // @ts-ignore
                row._valuesCache[input.name] = input.value;
            }
        });
        if (isCreating)
            onCreatingRowSave === null || onCreatingRowSave === void 0 ? void 0 : onCreatingRowSave({
                exitCreatingMode: () => setCreatingRow(null),
                row,
                table,
                values: row._valuesCache,
            });
        else if (isEditing) {
            onEditingRowSave === null || onEditingRowSave === void 0 ? void 0 : onEditingRowSave({
                exitEditingMode: () => setEditingRow(null),
                row,
                table,
                values: row === null || row === void 0 ? void 0 : row._valuesCache,
            });
        }
    };
    return (jsx(Box, { onClick: (e) => e.stopPropagation(), sx: (theme) => (Object.assign({ display: 'flex', gap: '0.75rem' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: variant === 'icon' ? (jsxs(Fragment, { children: [jsx(Tooltip, { title: localization.cancel, children: jsx(IconButton, { "aria-label": localization.cancel, onClick: handleCancel, children: jsx(CancelIcon, {}) }) }), ((isCreating && onCreatingRowSave) ||
                    (isEditing && onEditingRowSave)) && (jsx(Tooltip, { title: localization.save, children: jsx(IconButton, { "aria-label": localization.save, color: "info", onClick: handleSubmitRow, children: isSaving ? jsx(CircularProgress, { size: 18 }) : jsx(SaveIcon, {}) }) }))] })) : (jsxs(Fragment, { children: [jsx(Button, { onClick: handleCancel, sx: { minWidth: '100px' }, children: localization.cancel }), jsxs(Button, { onClick: handleSubmitRow, sx: { minWidth: '100px' }, variant: "contained", children: [isSaving && jsx(CircularProgress, { color: "inherit", size: 18 }), localization.save] })] })) }));
};

const parseCSSVarId = (id) => id.replace(/[^a-zA-Z0-9]/g, '_');
const getMRTTheme = (mrtTheme, muiTheme) => {
    var _a;
    const mrtThemeOverrides = parseFromValuesOrFunc(mrtTheme, muiTheme);
    const baseBackgroundColor = (_a = mrtThemeOverrides === null || mrtThemeOverrides === void 0 ? void 0 : mrtThemeOverrides.baseBackgroundColor) !== null && _a !== void 0 ? _a : (muiTheme.palette.mode === 'dark'
        ? lighten(muiTheme.palette.background.default, 0.05)
        : muiTheme.palette.background.default);
    return Object.assign({ baseBackgroundColor, draggingBorderColor: muiTheme.palette.primary.main, matchHighlightColor: muiTheme.palette.mode === 'dark'
            ? darken(muiTheme.palette.warning.dark, 0.25)
            : lighten(muiTheme.palette.warning.light, 0.5), menuBackgroundColor: lighten(baseBackgroundColor, 0.07), pinnedRowBackgroundColor: alpha(muiTheme.palette.primary.main, 0.1), selectedRowBackgroundColor: alpha(muiTheme.palette.primary.main, 0.2) }, mrtThemeOverrides);
};
const commonCellBeforeAfterStyles = {
    content: '""',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
};
const getCommonPinnedCellStyles = ({ column, table, theme, }) => {
    const { baseBackgroundColor } = table.options.mrtTheme;
    const isPinned = column === null || column === void 0 ? void 0 : column.getIsPinned();
    return {
        '&[data-pinned="true"]': {
            '&:before': Object.assign({ backgroundColor: alpha(darken(baseBackgroundColor, theme.palette.mode === 'dark' ? 0.05 : 0.01), 0.97), boxShadow: column
                    ? isPinned === 'left' && column.getIsLastColumn(isPinned)
                        ? `-4px 0 4px -4px ${alpha(theme.palette.grey[700], 0.5)} inset`
                        : isPinned === 'right' && column.getIsFirstColumn(isPinned)
                            ? `4px 0 4px -4px ${alpha(theme.palette.grey[700], 0.5)} inset`
                            : undefined
                    : undefined }, commonCellBeforeAfterStyles),
        },
    };
};
const getCommonMRTCellStyles = ({ column, header, table, tableCellProps, theme, }) => {
    var _a, _b, _c, _d, _e, _f;
    const { getState, options: { enableColumnVirtualization, layoutMode }, } = table;
    const { draggingColumn } = getState();
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const isColumnPinned = columnDef.columnDefType !== 'group' && column.getIsPinned();
    const widthStyles = {
        minWidth: `max(calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId((_a = header === null || header === void 0 ? void 0 : header.id) !== null && _a !== void 0 ? _a : column.id)}-size) * 1px), ${(_b = columnDef.minSize) !== null && _b !== void 0 ? _b : 30}px)`,
        width: `calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId((_c = header === null || header === void 0 ? void 0 : header.id) !== null && _c !== void 0 ? _c : column.id)}-size) * 1px)`,
    };
    if (layoutMode === 'grid') {
        widthStyles.flex = `${[0, false].includes(columnDef.grow)
            ? 0
            : `var(--${header ? 'header' : 'col'}-${parseCSSVarId((_d = header === null || header === void 0 ? void 0 : header.id) !== null && _d !== void 0 ? _d : column.id)}-size)`} 0 auto`;
    }
    else if (layoutMode === 'grid-no-grow') {
        widthStyles.flex = `${+(columnDef.grow || 0)} 0 auto`;
    }
    const pinnedStyles = isColumnPinned
        ? Object.assign(Object.assign({}, getCommonPinnedCellStyles({ column, table, theme })), { left: isColumnPinned === 'left'
                ? `${column.getStart('left')}px`
                : undefined, opacity: 0.97, position: 'sticky', right: isColumnPinned === 'right'
                ? `${column.getAfter('right')}px`
                : undefined }) : {};
    return Object.assign(Object.assign(Object.assign({ backgroundColor: 'inherit', backgroundImage: 'inherit', display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'flex' : undefined, justifyContent: columnDefType === 'group'
            ? 'center'
            : (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid'))
                ? tableCellProps.align
                : undefined, opacity: ((_e = table.getState().draggingColumn) === null || _e === void 0 ? void 0 : _e.id) === column.id ||
            ((_f = table.getState().hoveredColumn) === null || _f === void 0 ? void 0 : _f.id) === column.id
            ? 0.5
            : 1, position: 'relative', transition: enableColumnVirtualization
            ? 'none'
            : `padding 150ms ease-in-out`, zIndex: column.getIsResizing() || (draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id) === column.id
            ? 2
            : columnDefType !== 'group' && isColumnPinned
                ? 1
                : 0 }, pinnedStyles), widthStyles), parseFromValuesOrFunc(tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.sx, theme));
};
const getCommonToolbarStyles = ({ table, }) => ({
    alignItems: 'flex-start',
    backgroundColor: table.options.mrtTheme.baseBackgroundColor,
    display: 'grid',
    flexWrap: 'wrap-reverse',
    minHeight: '3.5rem',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 150ms ease-in-out',
    zIndex: 1,
});
const flipIconStyles = (theme) => theme.direction === 'rtl'
    ? { style: { transform: 'scaleX(-1)' } }
    : undefined;
const getCommonTooltipProps = (placement) => ({
    disableInteractive: true,
    enterDelay: 1000,
    enterNextDelay: 1000,
    placement,
});

const MRT_ActionMenuItem = (_a) => {
    var { icon, label, onOpenSubMenu, table } = _a, rest = __rest(_a, ["icon", "label", "onOpenSubMenu", "table"]);
    const { options: { icons: { ArrowRightIcon }, }, } = table;
    return (jsxs(MenuItem, Object.assign({ sx: {
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '120px',
            my: 0,
            py: '6px',
        } }, rest, { children: [jsxs(Box, { sx: {
                    alignItems: 'center',
                    display: 'flex',
                }, children: [jsx(ListItemIcon, { children: icon }), label] }), onOpenSubMenu && (jsx(IconButton, { onClick: onOpenSubMenu, onMouseEnter: onOpenSubMenu, size: "small", sx: { p: 0 }, children: jsx(ArrowRightIcon, {}) }))] })));
};

const MRT_RowActionMenu = (_a) => {
    var { anchorEl, handleEdit, row, setAnchorEl, staticRowIndex, table } = _a, rest = __rest(_a, ["anchorEl", "handleEdit", "row", "setAnchorEl", "staticRowIndex", "table"]);
    const { getState, options: { editDisplayMode, enableEditing, icons: { EditIcon }, localization, mrtTheme: { menuBackgroundColor }, renderRowActionMenuItems, }, } = table;
    const { density } = getState();
    return (jsxs(Menu, Object.assign({ MenuListProps: {
            dense: density === 'compact',
            sx: {
                backgroundColor: menuBackgroundColor,
            },
        }, anchorEl: anchorEl, disableScrollLock: true, onClick: (event) => event.stopPropagation(), onClose: () => setAnchorEl(null), open: !!anchorEl }, rest, { children: [parseFromValuesOrFunc(enableEditing, row) &&
                ['modal', 'row'].includes(editDisplayMode) && (jsx(MRT_ActionMenuItem, { icon: jsx(EditIcon, {}), label: localization.edit, onClick: handleEdit, table: table })), renderRowActionMenuItems === null || renderRowActionMenuItems === void 0 ? void 0 : renderRowActionMenuItems({
                closeMenu: () => setAnchorEl(null),
                row,
                staticRowIndex,
                table,
            })] })));
};

const commonIconButtonStyles = {
    '&:hover': {
        opacity: 1,
    },
    height: '2rem',
    ml: '10px',
    opacity: 0.5,
    transition: 'opacity 150ms',
    width: '2rem',
};
const MRT_ToggleRowActionMenuButton = (_a) => {
    var { cell, row, staticRowIndex, table } = _a, rest = __rest(_a, ["cell", "row", "staticRowIndex", "table"]);
    const { getState, options: { createDisplayMode, editDisplayMode, enableEditing, icons: { EditIcon, MoreHorizIcon }, localization, renderRowActionMenuItems, renderRowActions, }, setEditingRow, } = table;
    const { creatingRow, editingRow } = getState();
    const isCreating = (creatingRow === null || creatingRow === void 0 ? void 0 : creatingRow.id) === row.id;
    const isEditing = (editingRow === null || editingRow === void 0 ? void 0 : editingRow.id) === row.id;
    const showEditActionButtons = (isCreating && createDisplayMode === 'row') ||
        (isEditing && editDisplayMode === 'row');
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenRowActionMenu = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleStartEditMode = (event) => {
        event.stopPropagation();
        setEditingRow(Object.assign({}, row));
        setAnchorEl(null);
    };
    return (jsx(Fragment, { children: renderRowActions && !showEditActionButtons ? (renderRowActions({ cell, row, staticRowIndex, table })) : showEditActionButtons ? (jsx(MRT_EditActionButtons, { row: row, table: table })) : !renderRowActionMenuItems &&
            parseFromValuesOrFunc(enableEditing, row) &&
            ['modal', 'row'].includes(editDisplayMode) ? (jsx(Tooltip, { placement: "right", title: localization.edit, children: jsx(IconButton, Object.assign({ "aria-label": localization.edit, onClick: handleStartEditMode, sx: commonIconButtonStyles }, rest, { children: jsx(EditIcon, {}) })) })) : renderRowActionMenuItems ? (jsxs(Fragment, { children: [jsx(Tooltip, Object.assign({}, getCommonTooltipProps(), { title: localization.rowActions, children: jsx(IconButton, Object.assign({ "aria-label": localization.rowActions, onClick: handleOpenRowActionMenu, size: "small", sx: commonIconButtonStyles }, rest, { children: jsx(MoreHorizIcon, {}) })) })), jsx(MRT_RowActionMenu, { anchorEl: anchorEl, handleEdit: handleStartEditMode, row: row, setAnchorEl: setAnchorEl, staticRowIndex: staticRowIndex, table: table })] })) : null }));
};

const getMRT_RowActionsColumnDef = (tableOptions) => {
    return Object.assign({ Cell: ({ cell, row, staticRowIndex, table }) => (jsx(MRT_ToggleRowActionMenuButton, { cell: cell, row: row, staticRowIndex: staticRowIndex, table: table })) }, defaultDisplayColumnProps({
        header: 'actions',
        id: 'mrt-row-actions',
        size: 70,
        tableOptions,
    }));
};

const MRT_GrabHandleButton = (_a) => {
    var _b, _c;
    var { location, table } = _a, rest = __rest(_a, ["location", "table"]);
    const { options: { icons: { DragHandleIcon }, localization, }, } = table;
    return (jsx(Tooltip, Object.assign({}, getCommonTooltipProps('top'), { title: (_b = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _b !== void 0 ? _b : localization.move, children: jsx(IconButton, Object.assign({ "aria-label": (_c = rest.title) !== null && _c !== void 0 ? _c : localization.move, disableRipple: true, draggable: "true", size: "small" }, rest, { onClick: (e) => {
                var _a;
                e.stopPropagation();
                (_a = rest === null || rest === void 0 ? void 0 : rest.onClick) === null || _a === void 0 ? void 0 : _a.call(rest, e);
            }, sx: (theme) => (Object.assign({ '&:active': {
                    cursor: 'grabbing',
                }, '&:hover': {
                    backgroundColor: 'transparent',
                    opacity: 1,
                }, cursor: 'grab', m: '0 -0.1rem', opacity: location === 'row' ? 1 : 0.5, p: '2px', transition: 'all 150ms ease-in-out' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), title: undefined, children: jsx(DragHandleIcon, {}) })) })));
};

const MRT_TableBodyRowGrabHandle = (_a) => {
    var { row, rowRef, table } = _a, rest = __rest(_a, ["row", "rowRef", "table"]);
    const { options: { muiRowDragHandleProps }, } = table;
    const iconButtonProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiRowDragHandleProps, {
        row,
        table,
    })), rest);
    const handleDragStart = (event) => {
        var _a;
        (_a = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.onDragStart) === null || _a === void 0 ? void 0 : _a.call(iconButtonProps, event);
        try {
            event.dataTransfer.setDragImage(rowRef.current, 0, 0);
        }
        catch (e) {
            console.error(e);
        }
        table.setDraggingRow(row);
    };
    const handleDragEnd = (event) => {
        var _a;
        (_a = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.onDragEnd) === null || _a === void 0 ? void 0 : _a.call(iconButtonProps, event);
        table.setDraggingRow(null);
        table.setHoveredRow(null);
    };
    return (jsx(MRT_GrabHandleButton, Object.assign({}, iconButtonProps, { location: "row", onDragEnd: handleDragEnd, onDragStart: handleDragStart, table: table })));
};

const getMRT_RowDragColumnDef = (tableOptions) => {
    return Object.assign({ Cell: ({ row, rowRef, table }) => (jsx(MRT_TableBodyRowGrabHandle, { row: row, rowRef: rowRef, table: table })), grow: false }, defaultDisplayColumnProps({
        header: 'move',
        id: 'mrt-row-drag',
        size: 60,
        tableOptions,
    }));
};

const MRT_ExpandAllButton = (_a) => {
    var _b, _c;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getCanSomeRowsExpand, getIsAllRowsExpanded, getIsSomeRowsExpanded, getState, options: { icons: { KeyboardDoubleArrowDownIcon }, localization, muiExpandAllButtonProps, renderDetailPanel, }, toggleAllRowsExpanded, } = table;
    const { density, isLoading } = getState();
    const iconButtonProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiExpandAllButtonProps, {
        table,
    })), rest);
    const isAllRowsExpanded = getIsAllRowsExpanded();
    return (jsx(Tooltip, Object.assign({}, getCommonTooltipProps(), { title: (_b = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.title) !== null && _b !== void 0 ? _b : (isAllRowsExpanded ? localization.collapseAll : localization.expandAll), children: jsx("span", { children: jsx(IconButton, Object.assign({ "aria-label": localization.expandAll, disabled: isLoading || (!renderDetailPanel && !getCanSomeRowsExpand()), onClick: () => toggleAllRowsExpanded(!isAllRowsExpanded) }, iconButtonProps, { sx: (theme) => (Object.assign({ height: density === 'compact' ? '1.75rem' : '2.25rem', mt: density !== 'compact' ? '-0.25rem' : undefined, width: density === 'compact' ? '1.75rem' : '2.25rem' }, parseFromValuesOrFunc(iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.sx, theme))), title: undefined, children: (_c = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.children) !== null && _c !== void 0 ? _c : (jsx(KeyboardDoubleArrowDownIcon, { style: {
                        transform: `rotate(${isAllRowsExpanded ? -180 : getIsSomeRowsExpanded() ? -90 : 0}deg)`,
                        transition: 'transform 150ms',
                    } })) })) }) })));
};

const MRT_ExpandButton = ({ row, staticRowIndex, table, }) => {
    var _a, _b;
    const theme = useTheme();
    const { getState, options: { icons: { ExpandMoreIcon }, localization, muiExpandButtonProps, positionExpandColumn, renderDetailPanel, }, } = table;
    const { density } = getState();
    const iconButtonProps = parseFromValuesOrFunc(muiExpandButtonProps, {
        row,
        staticRowIndex,
        table,
    });
    const canExpand = row.getCanExpand();
    const isExpanded = row.getIsExpanded();
    const handleToggleExpand = (event) => {
        var _a;
        event.stopPropagation();
        row.toggleExpanded();
        (_a = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.onClick) === null || _a === void 0 ? void 0 : _a.call(iconButtonProps, event);
    };
    const detailPanel = !!(renderDetailPanel === null || renderDetailPanel === void 0 ? void 0 : renderDetailPanel({ row, table }));
    return (jsx(Tooltip, Object.assign({ disableHoverListener: !canExpand && !detailPanel }, getCommonTooltipProps(), { title: (_a = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.title) !== null && _a !== void 0 ? _a : (isExpanded ? localization.collapse : localization.expand), children: jsx("span", { children: jsx(IconButton, Object.assign({ "aria-label": localization.expand, disabled: !canExpand && !detailPanel }, iconButtonProps, { onClick: handleToggleExpand, sx: (theme) => (Object.assign({ height: density === 'compact' ? '1.75rem' : '2.25rem', opacity: !canExpand && !detailPanel ? 0.3 : 1, [theme.direction === 'rtl' || positionExpandColumn === 'last'
                        ? 'mr'
                        : 'ml']: `${row.depth * 16}px`, width: density === 'compact' ? '1.75rem' : '2.25rem' }, parseFromValuesOrFunc(iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.sx, theme))), title: undefined, children: (_b = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.children) !== null && _b !== void 0 ? _b : (jsx(ExpandMoreIcon, { style: {
                        transform: `rotate(${!canExpand && !renderDetailPanel
                            ? positionExpandColumn === 'last' ||
                                theme.direction === 'rtl'
                                ? 90
                                : -90
                            : isExpanded
                                ? -180
                                : 0}deg)`,
                        transition: 'transform 150ms',
                    } })) })) }) })));
};

const getMRT_RowExpandColumnDef = (tableOptions) => {
    var _a;
    const { defaultColumn, enableExpandAll, groupedColumnMode, positionExpandColumn, renderDetailPanel, state: { grouping }, } = tableOptions;
    const alignProps = positionExpandColumn === 'last'
        ? {
            align: 'right',
        }
        : undefined;
    return Object.assign({ Cell: ({ cell, column, row, staticRowIndex, table }) => {
            var _a, _b, _c;
            const expandButtonProps = { row, staticRowIndex, table };
            const subRowsLength = (_a = row.subRows) === null || _a === void 0 ? void 0 : _a.length;
            if (groupedColumnMode === 'remove' && row.groupingColumnId) {
                return (jsxs(Stack, { alignItems: "center", flexDirection: "row", gap: "0.25rem", children: [jsx(MRT_ExpandButton, Object.assign({}, expandButtonProps)), jsx(Tooltip, Object.assign({}, getCommonTooltipProps('right'), { title: table.getColumn(row.groupingColumnId).columnDef.header, children: jsx("span", { children: row.groupingValue }) })), !!subRowsLength && jsxs("span", { children: ["(", subRowsLength, ")"] })] }));
            }
            else {
                return (jsxs(Fragment, { children: [jsx(MRT_ExpandButton, Object.assign({}, expandButtonProps)), (_c = (_b = column.columnDef).GroupedCell) === null || _c === void 0 ? void 0 : _c.call(_b, { cell, column, row, table })] }));
            }
        }, Header: enableExpandAll
            ? ({ table }) => {
                var _a;
                return (jsxs(Fragment, { children: [jsx(MRT_ExpandAllButton, { table: table }), groupedColumnMode === 'remove' &&
                            ((_a = grouping === null || grouping === void 0 ? void 0 : grouping.map((groupedColumnId) => table.getColumn(groupedColumnId).columnDef.header)) === null || _a === void 0 ? void 0 : _a.join(', '))] }));
            }
            : undefined, muiTableBodyCellProps: alignProps, muiTableHeadCellProps: alignProps }, defaultDisplayColumnProps({
        header: 'expand',
        id: 'mrt-row-expand',
        size: groupedColumnMode === 'remove'
            ? (_a = defaultColumn === null || defaultColumn === void 0 ? void 0 : defaultColumn.size) !== null && _a !== void 0 ? _a : 180
            : renderDetailPanel
                ? enableExpandAll
                    ? 60
                    : 70
                : 100,
        tableOptions,
    }));
};

const getMRT_RowNumbersColumnDef = (tableOptions) => {
    const { localization, rowNumberDisplayMode } = tableOptions;
    const { pagination: { pageIndex, pageSize }, } = tableOptions.state;
    return Object.assign({ Cell: ({ row, staticRowIndex }) => {
            var _a;
            return ((_a = (rowNumberDisplayMode === 'static'
                ? (staticRowIndex || 0) + (pageSize || 0) * (pageIndex || 0)
                : row.index)) !== null && _a !== void 0 ? _a : 0) + 1;
        }, Header: () => localization.rowNumber, grow: false }, defaultDisplayColumnProps({
        header: 'rowNumbers',
        id: 'mrt-row-numbers',
        size: 50,
        tableOptions,
    }));
};

const MRT_RowPinButton = (_a) => {
    var { pinningPosition, row, table } = _a, rest = __rest(_a, ["pinningPosition", "row", "table"]);
    const { options: { icons: { CloseIcon, PushPinIcon }, localization, rowPinningDisplayMode, }, } = table;
    const isPinned = row.getIsPinned();
    const [tooltipOpened, setTooltipOpened] = useState(false);
    const handleTogglePin = (event) => {
        setTooltipOpened(false);
        event.stopPropagation();
        row.pin(isPinned ? false : pinningPosition);
    };
    return (jsx(Tooltip, Object.assign({}, getCommonTooltipProps(), { open: tooltipOpened, title: isPinned ? localization.unpin : localization.pin, children: jsx(IconButton, Object.assign({ "aria-label": localization.pin, onClick: handleTogglePin, onMouseEnter: () => setTooltipOpened(true), onMouseLeave: () => setTooltipOpened(false), size: "small" }, rest, { sx: (theme) => (Object.assign({ height: '24px', width: '24px' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: isPinned ? (jsx(CloseIcon, {})) : (jsx(PushPinIcon, { fontSize: "small", style: {
                    transform: `rotate(${rowPinningDisplayMode === 'sticky'
                        ? 135
                        : pinningPosition === 'top'
                            ? 180
                            : 0}deg)`,
                } })) })) })));
};

const MRT_TableBodyRowPinButton = (_a) => {
    var { row, table } = _a, rest = __rest(_a, ["row", "table"]);
    const { getState, options: { enableRowPinning, rowPinningDisplayMode }, } = table;
    const { density } = getState();
    const canPin = parseFromValuesOrFunc(enableRowPinning, row);
    if (!canPin)
        return null;
    const rowPinButtonProps = Object.assign({ row,
        table }, rest);
    if (rowPinningDisplayMode === 'top-and-bottom' && !row.getIsPinned()) {
        return (jsxs(Box, { sx: {
                display: 'flex',
                flexDirection: density === 'compact' ? 'row' : 'column',
            }, children: [jsx(MRT_RowPinButton, Object.assign({ pinningPosition: "top" }, rowPinButtonProps)), jsx(MRT_RowPinButton, Object.assign({ pinningPosition: "bottom" }, rowPinButtonProps))] }));
    }
    return (jsx(MRT_RowPinButton, Object.assign({ pinningPosition: rowPinningDisplayMode === 'bottom' ? 'bottom' : 'top' }, rowPinButtonProps)));
};

const getMRT_RowPinningColumnDef = (tableOptions) => {
    return Object.assign({ Cell: ({ row, table }) => (jsx(MRT_TableBodyRowPinButton, { row: row, table: table })), grow: false }, defaultDisplayColumnProps({
        header: 'pin',
        id: 'mrt-row-pin',
        size: 60,
        tableOptions,
    }));
};

const MRT_SelectCheckbox = (_a) => {
    var _b;
    var { row, staticRowIndex, table } = _a, rest = __rest(_a, ["row", "staticRowIndex", "table"]);
    const { getState, options: { enableMultiRowSelection, localization, muiSelectAllCheckboxProps, muiSelectCheckboxProps, selectAllMode, }, } = table;
    const { density, isLoading } = getState();
    const selectAll = !row;
    const allRowsSelected = selectAll
        ? selectAllMode === 'page'
            ? table.getIsAllPageRowsSelected()
            : table.getIsAllRowsSelected()
        : undefined;
    const isChecked = selectAll
        ? allRowsSelected
        : getIsRowSelected({ row, table });
    const checkboxProps = Object.assign(Object.assign({}, (selectAll
        ? parseFromValuesOrFunc(muiSelectAllCheckboxProps, { table })
        : parseFromValuesOrFunc(muiSelectCheckboxProps, {
            row,
            staticRowIndex,
            table,
        }))), rest);
    const onSelectionChange = row
        ? getMRT_RowSelectionHandler({
            row,
            staticRowIndex,
            table,
        })
        : undefined;
    const onSelectAllChange = getMRT_SelectAllHandler({ table });
    const commonProps = Object.assign(Object.assign({ 'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow, checked: isChecked, disabled: isLoading || (row && !row.getCanSelect()) || (row === null || row === void 0 ? void 0 : row.id) === 'mrt-row-create', inputProps: {
            'aria-label': selectAll
                ? localization.toggleSelectAll
                : localization.toggleSelectRow,
        }, onChange: (event) => {
            event.stopPropagation();
            selectAll ? onSelectAllChange(event) : onSelectionChange(event);
        }, size: (density === 'compact' ? 'small' : 'medium') }, checkboxProps), { onClick: (e) => {
            var _a;
            e.stopPropagation();
            (_a = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onClick) === null || _a === void 0 ? void 0 : _a.call(checkboxProps, e);
        }, sx: (theme) => (Object.assign({ height: density === 'compact' ? '1.75rem' : '2.5rem', m: density !== 'compact' ? '-0.4rem' : undefined, width: density === 'compact' ? '1.75rem' : '2.5rem', zIndex: 0 }, parseFromValuesOrFunc(checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.sx, theme))), title: undefined });
    return (jsx(Tooltip, Object.assign({}, getCommonTooltipProps(), { title: (_b = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.title) !== null && _b !== void 0 ? _b : (selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow), children: enableMultiRowSelection === false ? (jsx(Radio, Object.assign({}, commonProps))) : (jsx(Checkbox, Object.assign({ indeterminate: !isChecked && selectAll
                ? table.getIsSomeRowsSelected()
                : (row === null || row === void 0 ? void 0 : row.getIsSomeSelected()) && row.getCanSelectSubRows() }, commonProps))) })));
};

const getMRT_RowSelectColumnDef = (tableOptions) => {
    const { enableMultiRowSelection, enableSelectAll } = tableOptions;
    return Object.assign({ Cell: ({ row, staticRowIndex, table }) => (jsx(MRT_SelectCheckbox, { row: row, staticRowIndex: staticRowIndex, table: table })), Header: enableSelectAll && enableMultiRowSelection
            ? ({ table }) => jsx(MRT_SelectCheckbox, { table: table })
            : undefined, grow: false }, defaultDisplayColumnProps({
        header: 'select',
        id: 'mrt-row-select',
        size: enableSelectAll ? 60 : 70,
        tableOptions,
    }));
};

const MRT_Default_Icons = {
    ArrowDownwardIcon,
    ArrowRightIcon,
    CancelIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClearAllIcon,
    CloseIcon,
    ContentCopy,
    DensityLargeIcon,
    DensityMediumIcon,
    DensitySmallIcon,
    DragHandleIcon,
    DynamicFeedIcon,
    EditIcon,
    ExpandMoreIcon,
    FilterAltIcon,
    FilterListIcon,
    FilterListOffIcon,
    FirstPageIcon,
    FullscreenExitIcon,
    FullscreenIcon,
    KeyboardDoubleArrowDownIcon,
    LastPageIcon,
    MoreHorizIcon,
    MoreVertIcon,
    PushPinIcon,
    RestartAltIcon,
    SaveIcon,
    SearchIcon,
    SearchOffIcon,
    SortIcon,
    SyncAltIcon,
    ViewColumnIcon,
    VisibilityOffIcon,
};

const MRT_Localization_EN = {
    actions: 'Actions',
    and: 'and',
    cancel: 'Cancel',
    changeFilterMode: 'Change filter mode',
    changeSearchMode: 'Change search mode',
    clearFilter: 'Clear filter',
    clearSearch: 'Clear search',
    clearSelection: 'Clear selection',
    clearSort: 'Clear sort',
    clickToCopy: 'Click to copy',
    copy: 'Copy',
    collapse: 'Collapse',
    collapseAll: 'Collapse all',
    columnActions: 'Column Actions',
    copiedToClipboard: 'Copied to clipboard',
    dropToGroupBy: 'Drop to group by {column}',
    edit: 'Edit',
    expand: 'Expand',
    expandAll: 'Expand all',
    filterArrIncludes: 'Includes',
    filterArrIncludesAll: 'Includes all',
    filterArrIncludesSome: 'Includes',
    filterBetween: 'Between',
    filterBetweenInclusive: 'Between Inclusive',
    filterByColumn: 'Filter by {column}',
    filterContains: 'Contains',
    filterEmpty: 'Empty',
    filterEndsWith: 'Ends With',
    filterEquals: 'Equals',
    filterEqualsString: 'Equals',
    filterFuzzy: 'Fuzzy',
    filterGreaterThan: 'Greater Than',
    filterGreaterThanOrEqualTo: 'Greater Than Or Equal To',
    filterInNumberRange: 'Between',
    filterIncludesString: 'Contains',
    filterIncludesStringSensitive: 'Contains',
    filterLessThan: 'Less Than',
    filterLessThanOrEqualTo: 'Less Than Or Equal To',
    filterMode: 'Filter Mode: {filterType}',
    filterNotEmpty: 'Not Empty',
    filterNotEquals: 'Not Equals',
    filterStartsWith: 'Starts With',
    filterWeakEquals: 'Equals',
    filteringByColumn: 'Filtering by {column} - {filterType} {filterValue}',
    goToFirstPage: 'Go to first page',
    goToLastPage: 'Go to last page',
    goToNextPage: 'Go to next page',
    goToPreviousPage: 'Go to previous page',
    grab: 'Grab',
    groupByColumn: 'Group by {column}',
    groupedBy: 'Grouped by ',
    hideAll: 'Hide all',
    hideColumn: 'Hide {column} column',
    max: 'Max',
    min: 'Min',
    move: 'Move',
    noRecordsToDisplay: 'No records to display',
    noResultsFound: 'No results found',
    of: 'of',
    or: 'or',
    pin: 'Pin',
    pinToLeft: 'Pin to left',
    pinToRight: 'Pin to right',
    resetColumnSize: 'Reset column size',
    resetOrder: 'Reset order',
    rowActions: 'Row Actions',
    rowNumber: '#',
    rowNumbers: 'Row Numbers',
    rowsPerPage: 'Rows per page',
    save: 'Save',
    search: 'Search',
    selectedCountOfRowCountRowsSelected: '{selectedCount} of {rowCount} row(s) selected',
    select: 'Select',
    showAll: 'Show all',
    showAllColumns: 'Show all columns',
    showHideColumns: 'Show/Hide columns',
    showHideFilters: 'Show/Hide filters',
    showHideSearch: 'Show/Hide search',
    sortByColumnAsc: 'Sort by {column} ascending',
    sortByColumnDesc: 'Sort by {column} descending',
    sortedByColumnAsc: 'Sorted by {column} ascending',
    sortedByColumnDesc: 'Sorted by {column} descending',
    thenBy: ', then by ',
    toggleDensity: 'Toggle density',
    toggleFullScreen: 'Toggle full screen',
    toggleSelectAll: 'Toggle select all',
    toggleSelectRow: 'Toggle select row',
    toggleVisibility: 'Toggle visibility',
    ungroupByColumn: 'Ungroup by {column}',
    unpin: 'Unpin',
    unpinAll: 'Unpin all',
};

const MRT_DefaultColumn = {
    filterVariant: 'text',
    maxSize: 1000,
    minSize: 40,
    size: 180,
};
const MRT_DefaultDisplayColumn = {
    columnDefType: 'display',
    enableClickToCopy: false,
    enableColumnActions: false,
    enableColumnDragging: false,
    enableColumnFilter: false,
    enableColumnOrdering: false,
    enableEditing: false,
    enableGlobalFilter: false,
    enableGrouping: false,
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
};
const useMRT_TableOptions = (_a) => {
    var _b;
    var { aggregationFns, autoResetExpanded = false, columnFilterDisplayMode = 'subheader', columnResizeDirection, columnResizeMode = 'onChange', createDisplayMode = 'modal', defaultColumn, defaultDisplayColumn, editDisplayMode = 'modal', enableBatchRowSelection = true, enableBottomToolbar = true, enableColumnActions = true, enableColumnFilters = true, enableColumnOrdering = false, enableColumnPinning = false, enableColumnResizing = false, enableColumnVirtualization, enableDensityToggle = true, enableExpandAll = true, enableExpanding, enableFacetedValues = false, enableFilterMatchHighlighting = true, enableFilters = true, enableFullScreenToggle = true, enableGlobalFilter = true, enableGlobalFilterRankedResults = true, enableGrouping = false, enableHiding = true, enableMultiRowSelection = true, enableMultiSort = true, enablePagination = true, enableRowPinning = false, enableRowSelection = false, enableRowVirtualization, enableSelectAll = true, enableSorting = true, enableStickyHeader = false, enableTableFooter = true, enableTableHead = true, enableToolbarInternalActions = true, enableTopToolbar = true, filterFns, icons, layoutMode, localization, manualFiltering, manualGrouping, manualPagination, manualSorting, mrtTheme, paginationDisplayMode = 'default', positionActionsColumn = 'first', positionCreatingRow = 'top', positionExpandColumn = 'first', positionGlobalFilter = 'right', positionPagination = 'bottom', positionToolbarAlertBanner = 'top', positionToolbarDropZone = 'top', rowNumberDisplayMode = 'static', rowPinningDisplayMode = 'sticky', selectAllMode = 'page', sortingFns } = _a, rest = __rest(_a, ["aggregationFns", "autoResetExpanded", "columnFilterDisplayMode", "columnResizeDirection", "columnResizeMode", "createDisplayMode", "defaultColumn", "defaultDisplayColumn", "editDisplayMode", "enableBatchRowSelection", "enableBottomToolbar", "enableColumnActions", "enableColumnFilters", "enableColumnOrdering", "enableColumnPinning", "enableColumnResizing", "enableColumnVirtualization", "enableDensityToggle", "enableExpandAll", "enableExpanding", "enableFacetedValues", "enableFilterMatchHighlighting", "enableFilters", "enableFullScreenToggle", "enableGlobalFilter", "enableGlobalFilterRankedResults", "enableGrouping", "enableHiding", "enableMultiRowSelection", "enableMultiSort", "enablePagination", "enableRowPinning", "enableRowSelection", "enableRowVirtualization", "enableSelectAll", "enableSorting", "enableStickyHeader", "enableTableFooter", "enableTableHead", "enableToolbarInternalActions", "enableTopToolbar", "filterFns", "icons", "layoutMode", "localization", "manualFiltering", "manualGrouping", "manualPagination", "manualSorting", "mrtTheme", "paginationDisplayMode", "positionActionsColumn", "positionCreatingRow", "positionExpandColumn", "positionGlobalFilter", "positionPagination", "positionToolbarAlertBanner", "positionToolbarDropZone", "rowNumberDisplayMode", "rowPinningDisplayMode", "selectAllMode", "sortingFns"]);
    const theme = useTheme();
    icons = useMemo(() => (Object.assign(Object.assign({}, MRT_Default_Icons), icons)), [icons]);
    localization = useMemo(() => (Object.assign(Object.assign({}, MRT_Localization_EN), localization)), [localization]);
    mrtTheme = useMemo(() => getMRTTheme(mrtTheme, theme), [mrtTheme, theme]);
    aggregationFns = useMemo(() => (Object.assign(Object.assign({}, MRT_AggregationFns), aggregationFns)), []);
    filterFns = useMemo(() => (Object.assign(Object.assign({}, MRT_FilterFns), filterFns)), []);
    sortingFns = useMemo(() => (Object.assign(Object.assign({}, MRT_SortingFns), sortingFns)), []);
    defaultColumn = useMemo(() => (Object.assign(Object.assign({}, MRT_DefaultColumn), defaultColumn)), [defaultColumn]);
    defaultDisplayColumn = useMemo(() => (Object.assign(Object.assign({}, MRT_DefaultDisplayColumn), defaultDisplayColumn)), [defaultDisplayColumn]);
    //cannot be changed after initialization
    [enableColumnVirtualization, enableRowVirtualization] = useMemo(() => [enableColumnVirtualization, enableRowVirtualization], []);
    if (!columnResizeDirection) {
        columnResizeDirection = theme.direction || 'ltr';
    }
    layoutMode =
        layoutMode || (enableColumnResizing ? 'grid-no-grow' : 'semantic');
    if (layoutMode === 'semantic' &&
        (enableRowVirtualization || enableColumnVirtualization)) {
        layoutMode = 'grid';
    }
    if (enableRowVirtualization) {
        enableStickyHeader = true;
    }
    if (enablePagination === false && manualPagination === undefined) {
        manualPagination = true;
    }
    if (!((_b = rest.data) === null || _b === void 0 ? void 0 : _b.length)) {
        manualFiltering = true;
        manualGrouping = true;
        manualPagination = true;
        manualSorting = true;
    }
    return Object.assign({ aggregationFns,
        autoResetExpanded,
        columnFilterDisplayMode,
        columnResizeDirection,
        columnResizeMode,
        createDisplayMode,
        defaultColumn,
        defaultDisplayColumn,
        editDisplayMode,
        enableBatchRowSelection,
        enableBottomToolbar,
        enableColumnActions,
        enableColumnFilters,
        enableColumnOrdering,
        enableColumnPinning,
        enableColumnResizing,
        enableColumnVirtualization,
        enableDensityToggle,
        enableExpandAll,
        enableExpanding,
        enableFacetedValues,
        enableFilterMatchHighlighting,
        enableFilters,
        enableFullScreenToggle,
        enableGlobalFilter,
        enableGlobalFilterRankedResults,
        enableGrouping,
        enableHiding,
        enableMultiRowSelection,
        enableMultiSort,
        enablePagination,
        enableRowPinning,
        enableRowSelection,
        enableRowVirtualization,
        enableSelectAll,
        enableSorting,
        enableStickyHeader,
        enableTableFooter,
        enableTableHead,
        enableToolbarInternalActions,
        enableTopToolbar,
        filterFns, getCoreRowModel: getCoreRowModel(), getExpandedRowModel: enableExpanding || enableGrouping ? getExpandedRowModel() : undefined, getFacetedMinMaxValues: enableFacetedValues
            ? getFacetedMinMaxValues()
            : undefined, getFacetedRowModel: enableFacetedValues ? getFacetedRowModel() : undefined, getFacetedUniqueValues: enableFacetedValues
            ? getFacetedUniqueValues()
            : undefined, getFilteredRowModel: enableColumnFilters || enableGlobalFilter || enableFilters
            ? getFilteredRowModel()
            : undefined, getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined, getPaginationRowModel: enablePagination
            ? getPaginationRowModel()
            : undefined, getSortedRowModel: enableSorting ? getSortedRowModel() : undefined, getSubRows: (row) => row === null || row === void 0 ? void 0 : row.subRows, icons,
        layoutMode,
        localization,
        manualFiltering,
        manualGrouping,
        manualPagination,
        manualSorting,
        mrtTheme,
        paginationDisplayMode,
        positionActionsColumn,
        positionCreatingRow,
        positionExpandColumn,
        positionGlobalFilter,
        positionPagination,
        positionToolbarAlertBanner,
        positionToolbarDropZone,
        rowNumberDisplayMode,
        rowPinningDisplayMode,
        selectAllMode,
        sortingFns }, rest);
};

const blankColProps = {
    children: null,
    sx: {
        minWidth: 0,
        p: 0,
        width: 0,
    },
};
const getMRT_RowSpacerColumnDef = (tableOptions) => {
    return Object.assign(Object.assign(Object.assign(Object.assign({}, defaultDisplayColumnProps({
        id: 'mrt-row-spacer',
        size: 0,
        tableOptions,
    })), { grow: true }), MRT_DefaultDisplayColumn), { muiTableBodyCellProps: blankColProps, muiTableFooterCellProps: blankColProps, muiTableHeadCellProps: blankColProps });
};

const useMRT_Effects = (table) => {
    const { getIsSomeRowsPinned, getPrePaginationRowModel, getState, options: { enablePagination, enableRowPinning, rowCount }, } = table;
    const { columnOrder, density, globalFilter, isFullScreen, isLoading, pagination, showSkeletons, sorting, } = getState();
    const totalColumnCount = table.options.columns.length;
    const totalRowCount = rowCount !== null && rowCount !== void 0 ? rowCount : getPrePaginationRowModel().rows.length;
    const rerender = useReducer(() => ({}), {})[1];
    const initialBodyHeight = useRef();
    const previousTop = useRef();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            initialBodyHeight.current = document.body.style.height;
        }
    }, []);
    //hide scrollbars when table is in full screen mode, preserve body scroll position after full screen exit
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isFullScreen) {
                previousTop.current = document.body.getBoundingClientRect().top; //save scroll position
                document.body.style.height = '100dvh'; //hide page scrollbars when table is in full screen mode
            }
            else {
                document.body.style.height = initialBodyHeight.current;
                if (!previousTop.current)
                    return;
                //restore scroll position
                window.scrollTo({
                    behavior: 'instant',
                    top: -1 * previousTop.current,
                });
            }
        }
    }, [isFullScreen]);
    //recalculate column order when columns change or features are toggled on/off
    useEffect(() => {
        if (totalColumnCount !== columnOrder.length) {
            table.setColumnOrder(getDefaultColumnOrderIds(table.options));
        }
    }, [totalColumnCount]);
    //if page index is out of bounds, set it to the last page
    useEffect(() => {
        if (!enablePagination || isLoading || showSkeletons)
            return;
        const { pageIndex, pageSize } = pagination;
        const firstVisibleRowIndex = pageIndex * pageSize;
        if (firstVisibleRowIndex >= totalRowCount) {
            table.setPageIndex(Math.ceil(totalRowCount / pageSize) - 1);
        }
    }, [totalRowCount]);
    //turn off sort when global filter is looking for ranked results
    const appliedSort = useRef(sorting);
    useEffect(() => {
        if (sorting.length) {
            appliedSort.current = sorting;
        }
    }, [sorting]);
    useEffect(() => {
        if (!getCanRankRows(table))
            return;
        if (globalFilter) {
            table.setSorting([]);
        }
        else {
            table.setSorting(() => appliedSort.current || []);
        }
    }, [globalFilter]);
    //fix pinned row top style when density changes
    useEffect(() => {
        if (enableRowPinning && getIsSomeRowsPinned()) {
            setTimeout(() => {
                rerender();
            }, 150);
        }
    }, [density]);
};

/**
 * The MRT hook that wraps the TanStack useReactTable hook and adds additional functionality
 * @param definedTableOptions - table options with proper defaults set
 * @returns the MRT table instance
 */
const useMRT_TableInstance = (definedTableOptions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
    const lastSelectedRowId = useRef(null);
    const actionCellRef = useRef(null);
    const bottomToolbarRef = useRef(null);
    const editInputRefs = useRef({});
    const filterInputRefs = useRef({});
    const searchInputRef = useRef(null);
    const tableContainerRef = useRef(null);
    const tableHeadCellRefs = useRef({});
    const tablePaperRef = useRef(null);
    const topToolbarRef = useRef(null);
    const tableHeadRef = useRef(null);
    const tableFooterRef = useRef(null);
    //transform initial state with proper column order
    const initialState = useMemo(() => {
        var _a, _b, _c;
        const initState = (_a = definedTableOptions.initialState) !== null && _a !== void 0 ? _a : {};
        initState.columnOrder =
            (_b = initState.columnOrder) !== null && _b !== void 0 ? _b : getDefaultColumnOrderIds(Object.assign(Object.assign({}, definedTableOptions), { state: Object.assign(Object.assign({}, definedTableOptions.initialState), definedTableOptions.state) }));
        initState.globalFilterFn = (_c = definedTableOptions.globalFilterFn) !== null && _c !== void 0 ? _c : 'fuzzy';
        return initState;
    }, []);
    definedTableOptions.initialState = initialState;
    const [actionCell, setActionCell] = useState((_a = initialState.actionCell) !== null && _a !== void 0 ? _a : null);
    const [creatingRow, _setCreatingRow] = useState((_b = initialState.creatingRow) !== null && _b !== void 0 ? _b : null);
    const [columnFilterFns, setColumnFilterFns] = useState(() => Object.assign({}, ...getAllLeafColumnDefs(definedTableOptions.columns).map((col) => {
        var _a, _b, _c, _d;
        return ({
            [getColumnId(col)]: col.filterFn instanceof Function
                ? (_a = col.filterFn.name) !== null && _a !== void 0 ? _a : 'custom'
                : (_d = (_b = col.filterFn) !== null && _b !== void 0 ? _b : (_c = initialState === null || initialState === void 0 ? void 0 : initialState.columnFilterFns) === null || _c === void 0 ? void 0 : _c[getColumnId(col)]) !== null && _d !== void 0 ? _d : getDefaultColumnFilterFn(col),
        });
    })));
    const [columnOrder, onColumnOrderChange] = useState((_c = initialState.columnOrder) !== null && _c !== void 0 ? _c : []);
    const [columnSizingInfo, onColumnSizingInfoChange] = useState((_d = initialState.columnSizingInfo) !== null && _d !== void 0 ? _d : {});
    const [density, setDensity] = useState((_e = initialState === null || initialState === void 0 ? void 0 : initialState.density) !== null && _e !== void 0 ? _e : 'comfortable');
    const [draggingColumn, setDraggingColumn] = useState((_f = initialState.draggingColumn) !== null && _f !== void 0 ? _f : null);
    const [draggingRow, setDraggingRow] = useState((_g = initialState.draggingRow) !== null && _g !== void 0 ? _g : null);
    const [editingCell, setEditingCell] = useState((_h = initialState.editingCell) !== null && _h !== void 0 ? _h : null);
    const [editingRow, setEditingRow] = useState((_j = initialState.editingRow) !== null && _j !== void 0 ? _j : null);
    const [globalFilterFn, setGlobalFilterFn] = useState((_k = initialState.globalFilterFn) !== null && _k !== void 0 ? _k : 'fuzzy');
    const [grouping, onGroupingChange] = useState((_l = initialState.grouping) !== null && _l !== void 0 ? _l : []);
    const [hoveredColumn, setHoveredColumn] = useState((_m = initialState.hoveredColumn) !== null && _m !== void 0 ? _m : null);
    const [hoveredRow, setHoveredRow] = useState((_o = initialState.hoveredRow) !== null && _o !== void 0 ? _o : null);
    const [isFullScreen, setIsFullScreen] = useState((_p = initialState === null || initialState === void 0 ? void 0 : initialState.isFullScreen) !== null && _p !== void 0 ? _p : false);
    const [pagination, onPaginationChange] = useState((_q = initialState === null || initialState === void 0 ? void 0 : initialState.pagination) !== null && _q !== void 0 ? _q : { pageIndex: 0, pageSize: 10 });
    const [showAlertBanner, setShowAlertBanner] = useState((_r = initialState === null || initialState === void 0 ? void 0 : initialState.showAlertBanner) !== null && _r !== void 0 ? _r : false);
    const [showColumnFilters, setShowColumnFilters] = useState((_s = initialState === null || initialState === void 0 ? void 0 : initialState.showColumnFilters) !== null && _s !== void 0 ? _s : false);
    const [showGlobalFilter, setShowGlobalFilter] = useState((_t = initialState === null || initialState === void 0 ? void 0 : initialState.showGlobalFilter) !== null && _t !== void 0 ? _t : false);
    const [showToolbarDropZone, setShowToolbarDropZone] = useState((_u = initialState === null || initialState === void 0 ? void 0 : initialState.showToolbarDropZone) !== null && _u !== void 0 ? _u : false);
    definedTableOptions.state = Object.assign({ actionCell,
        columnFilterFns,
        columnOrder,
        columnSizingInfo,
        creatingRow,
        density,
        draggingColumn,
        draggingRow,
        editingCell,
        editingRow,
        globalFilterFn,
        grouping,
        hoveredColumn,
        hoveredRow,
        isFullScreen,
        pagination,
        showAlertBanner,
        showColumnFilters,
        showGlobalFilter,
        showToolbarDropZone }, definedTableOptions.state);
    //The table options now include all state needed to help determine column visibility and order logic
    const statefulTableOptions = definedTableOptions;
    //don't recompute columnDefs while resizing column or dragging column/row
    const columnDefsRef = useRef([]);
    statefulTableOptions.columns =
        statefulTableOptions.state.columnSizingInfo.isResizingColumn ||
            statefulTableOptions.state.draggingColumn ||
            statefulTableOptions.state.draggingRow
            ? columnDefsRef.current
            : prepareColumns({
                columnDefs: [
                    ...[
                        showRowPinningColumn(statefulTableOptions) &&
                            getMRT_RowPinningColumnDef(statefulTableOptions),
                        showRowDragColumn(statefulTableOptions) &&
                            getMRT_RowDragColumnDef(statefulTableOptions),
                        showRowActionsColumn(statefulTableOptions) &&
                            getMRT_RowActionsColumnDef(statefulTableOptions),
                        showRowExpandColumn(statefulTableOptions) &&
                            getMRT_RowExpandColumnDef(statefulTableOptions),
                        showRowSelectionColumn(statefulTableOptions) &&
                            getMRT_RowSelectColumnDef(statefulTableOptions),
                        showRowNumbersColumn(statefulTableOptions) &&
                            getMRT_RowNumbersColumnDef(statefulTableOptions),
                    ].filter(Boolean),
                    ...statefulTableOptions.columns,
                    ...[
                        showRowSpacerColumn(statefulTableOptions) &&
                            getMRT_RowSpacerColumnDef(statefulTableOptions),
                    ].filter(Boolean),
                ],
                tableOptions: statefulTableOptions,
            });
    columnDefsRef.current = statefulTableOptions.columns;
    //if loading, generate blank rows to show skeleton loaders
    statefulTableOptions.data = useMemo(() => (statefulTableOptions.state.isLoading ||
        statefulTableOptions.state.showSkeletons) &&
        !statefulTableOptions.data.length
        ? [
            ...Array(Math.min(statefulTableOptions.state.pagination.pageSize, 20)).fill(null),
        ].map(() => Object.assign({}, ...getAllLeafColumnDefs(statefulTableOptions.columns).map((col) => ({
            [getColumnId(col)]: null,
        }))))
        : statefulTableOptions.data, [
        statefulTableOptions.data,
        statefulTableOptions.state.isLoading,
        statefulTableOptions.state.showSkeletons,
    ]);
    //@ts-ignore
    const table = useReactTable(Object.assign(Object.assign({ onColumnOrderChange,
        onColumnSizingInfoChange,
        onGroupingChange,
        onPaginationChange }, statefulTableOptions), { globalFilterFn: (_v = statefulTableOptions.filterFns) === null || _v === void 0 ? void 0 : _v[globalFilterFn !== null && globalFilterFn !== void 0 ? globalFilterFn : 'fuzzy'] }));
    table.refs = {
        actionCellRef,
        bottomToolbarRef,
        editInputRefs,
        filterInputRefs,
        lastSelectedRowId,
        searchInputRef,
        tableContainerRef,
        tableFooterRef,
        tableHeadCellRefs,
        tableHeadRef,
        tablePaperRef,
        topToolbarRef,
    };
    table.setActionCell =
        (_w = statefulTableOptions.onActionCellChange) !== null && _w !== void 0 ? _w : setActionCell;
    table.setCreatingRow = (row) => {
        var _a, _b;
        let _row = row;
        if (row === true) {
            _row = createRow(table);
        }
        (_b = (_a = statefulTableOptions === null || statefulTableOptions === void 0 ? void 0 : statefulTableOptions.onCreatingRowChange) === null || _a === void 0 ? void 0 : _a.call(statefulTableOptions, _row)) !== null && _b !== void 0 ? _b : _setCreatingRow(_row);
    };
    table.setColumnFilterFns =
        (_x = statefulTableOptions.onColumnFilterFnsChange) !== null && _x !== void 0 ? _x : setColumnFilterFns;
    table.setDensity = (_y = statefulTableOptions.onDensityChange) !== null && _y !== void 0 ? _y : setDensity;
    table.setDraggingColumn =
        (_z = statefulTableOptions.onDraggingColumnChange) !== null && _z !== void 0 ? _z : setDraggingColumn;
    table.setDraggingRow =
        (_0 = statefulTableOptions.onDraggingRowChange) !== null && _0 !== void 0 ? _0 : setDraggingRow;
    table.setEditingCell =
        (_1 = statefulTableOptions.onEditingCellChange) !== null && _1 !== void 0 ? _1 : setEditingCell;
    table.setEditingRow =
        (_2 = statefulTableOptions.onEditingRowChange) !== null && _2 !== void 0 ? _2 : setEditingRow;
    table.setGlobalFilterFn =
        (_3 = statefulTableOptions.onGlobalFilterFnChange) !== null && _3 !== void 0 ? _3 : setGlobalFilterFn;
    table.setHoveredColumn =
        (_4 = statefulTableOptions.onHoveredColumnChange) !== null && _4 !== void 0 ? _4 : setHoveredColumn;
    table.setHoveredRow =
        (_5 = statefulTableOptions.onHoveredRowChange) !== null && _5 !== void 0 ? _5 : setHoveredRow;
    table.setIsFullScreen =
        (_6 = statefulTableOptions.onIsFullScreenChange) !== null && _6 !== void 0 ? _6 : setIsFullScreen;
    table.setShowAlertBanner =
        (_7 = statefulTableOptions.onShowAlertBannerChange) !== null && _7 !== void 0 ? _7 : setShowAlertBanner;
    table.setShowColumnFilters =
        (_8 = statefulTableOptions.onShowColumnFiltersChange) !== null && _8 !== void 0 ? _8 : setShowColumnFilters;
    table.setShowGlobalFilter =
        (_9 = statefulTableOptions.onShowGlobalFilterChange) !== null && _9 !== void 0 ? _9 : setShowGlobalFilter;
    table.setShowToolbarDropZone =
        (_10 = statefulTableOptions.onShowToolbarDropZoneChange) !== null && _10 !== void 0 ? _10 : setShowToolbarDropZone;
    useMRT_Effects(table);
    return table;
};

const useMaterialReactTable = (tableOptions) => useMRT_TableInstance(useMRT_TableOptions(tableOptions));

const extraIndexRangeExtractor = (range, draggingIndex) => {
    const newIndexes = defaultRangeExtractor(range);
    if (draggingIndex === undefined)
        return newIndexes;
    if (draggingIndex >= 0 &&
        draggingIndex < Math.max(range.startIndex - range.overscan, 0)) {
        newIndexes.unshift(draggingIndex);
    }
    if (draggingIndex >= 0 && draggingIndex > range.endIndex + range.overscan) {
        newIndexes.push(draggingIndex);
    }
    return newIndexes;
};

const useMRT_ColumnVirtualizer = (table) => {
    var _a, _b, _c, _d;
    const { getState, options: { columnVirtualizerInstanceRef, columnVirtualizerOptions, enableColumnPinning, enableColumnVirtualization, }, refs: { tableContainerRef }, } = table;
    const { columnPinning, columnVisibility, draggingColumn } = getState();
    if (!enableColumnVirtualization)
        return undefined;
    const columnVirtualizerProps = parseFromValuesOrFunc(columnVirtualizerOptions, {
        table,
    });
    const visibleColumns = table.getVisibleLeafColumns();
    const [leftPinnedIndexes, rightPinnedIndexes] = useMemo(() => enableColumnPinning
        ? [
            table.getLeftVisibleLeafColumns().map((c) => c.getPinnedIndex()),
            table
                .getRightVisibleLeafColumns()
                .map((column) => visibleColumns.length - column.getPinnedIndex() - 1)
                .sort((a, b) => a - b),
        ]
        : [[], []], [columnPinning, columnVisibility, enableColumnPinning]);
    const numPinnedLeft = leftPinnedIndexes.length;
    const numPinnedRight = rightPinnedIndexes.length;
    const draggingColumnIndex = useMemo(() => (draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id)
        ? visibleColumns.findIndex((c) => c.id === (draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id))
        : undefined, [draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id]);
    const columnVirtualizer = useVirtualizer(Object.assign({ count: visibleColumns.length, estimateSize: (index) => visibleColumns[index].getSize(), getScrollElement: () => tableContainerRef.current, horizontal: true, overscan: 3, rangeExtractor: useCallback((range) => {
            const newIndexes = extraIndexRangeExtractor(range, draggingColumnIndex);
            if (!numPinnedLeft && !numPinnedRight) {
                return newIndexes;
            }
            return [
                ...new Set([
                    ...leftPinnedIndexes,
                    ...newIndexes,
                    ...rightPinnedIndexes,
                ]),
            ];
        }, [leftPinnedIndexes, rightPinnedIndexes, draggingColumnIndex]) }, columnVirtualizerProps));
    const virtualColumns = columnVirtualizer.getVirtualItems();
    columnVirtualizer.virtualColumns = virtualColumns;
    const numColumns = virtualColumns.length;
    if (numColumns) {
        const totalSize = columnVirtualizer.getTotalSize();
        const leftNonPinnedStart = ((_a = virtualColumns[numPinnedLeft]) === null || _a === void 0 ? void 0 : _a.start) || 0;
        const leftNonPinnedEnd = ((_b = virtualColumns[leftPinnedIndexes.length - 1]) === null || _b === void 0 ? void 0 : _b.end) || 0;
        const rightNonPinnedStart = ((_c = virtualColumns[numColumns - numPinnedRight]) === null || _c === void 0 ? void 0 : _c.start) || 0;
        const rightNonPinnedEnd = ((_d = virtualColumns[numColumns - numPinnedRight - 1]) === null || _d === void 0 ? void 0 : _d.end) || 0;
        columnVirtualizer.virtualPaddingLeft =
            leftNonPinnedStart - leftNonPinnedEnd;
        columnVirtualizer.virtualPaddingRight =
            totalSize -
                rightNonPinnedEnd -
                (numPinnedRight ? totalSize - rightNonPinnedStart : 0);
    }
    if (columnVirtualizerInstanceRef) {
        //@ts-ignore
        columnVirtualizerInstanceRef.current = columnVirtualizer;
    }
    return columnVirtualizer;
};

const useMRT_RowVirtualizer = (table, rows) => {
    var _a;
    const { getRowModel, getState, options: { enableRowVirtualization, renderDetailPanel, rowVirtualizerInstanceRef, rowVirtualizerOptions, }, refs: { tableContainerRef }, } = table;
    const { density, draggingRow, expanded } = getState();
    if (!enableRowVirtualization)
        return undefined;
    const rowVirtualizerProps = parseFromValuesOrFunc(rowVirtualizerOptions, {
        table,
    });
    const rowCount = (_a = rows === null || rows === void 0 ? void 0 : rows.length) !== null && _a !== void 0 ? _a : getRowModel().rows.length;
    const normalRowHeight = density === 'compact' ? 37 : density === 'comfortable' ? 58 : 73;
    const rowVirtualizer = useVirtualizer(Object.assign({ count: renderDetailPanel ? rowCount * 2 : rowCount, estimateSize: (index) => renderDetailPanel && index % 2 === 1
            ? expanded === true
                ? 100
                : 0
            : normalRowHeight, getScrollElement: () => tableContainerRef.current, measureElement: typeof window !== 'undefined' &&
            navigator.userAgent.indexOf('Firefox') === -1
            ? (element) => element === null || element === void 0 ? void 0 : element.getBoundingClientRect().height
            : undefined, overscan: 4, rangeExtractor: useCallback((range) => {
            var _a;
            return extraIndexRangeExtractor(range, (_a = draggingRow === null || draggingRow === void 0 ? void 0 : draggingRow.index) !== null && _a !== void 0 ? _a : 0);
        }, [draggingRow]) }, rowVirtualizerProps));
    rowVirtualizer.virtualRows = rowVirtualizer.getVirtualItems();
    if (rowVirtualizerInstanceRef) {
        //@ts-ignore
        rowVirtualizerInstanceRef.current = rowVirtualizer;
    }
    return rowVirtualizer;
};

const useMRT_Rows = (table) => {
    const { getRowModel, getState, options: { data, enableGlobalFilterRankedResults, positionCreatingRow }, } = table;
    const { creatingRow, expanded, globalFilter, pagination, rowPinning, sorting, } = getState();
    const rows = useMemo(() => getMRT_Rows(table), [
        creatingRow,
        data,
        enableGlobalFilterRankedResults,
        expanded,
        getRowModel().rows,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        positionCreatingRow,
        rowPinning,
        sorting,
    ]);
    return rows;
};

const allowedTypes = ['string', 'number'];
const MRT_TableBodyCellValue = ({ cell, rowRef, staticColumnIndex, staticRowIndex, table, }) => {
    var _a, _b, _c;
    const { getState, options: { enableFilterMatchHighlighting, mrtTheme: { matchHighlightColor }, }, } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const { globalFilter, globalFilterFn } = getState();
    const filterValue = column.getFilterValue();
    let renderedCellValue = cell.getIsAggregated() && columnDef.AggregatedCell
        ? columnDef.AggregatedCell({
            cell,
            column,
            row,
            table,
        })
        : row.getIsGrouped() && !cell.getIsGrouped()
            ? null
            : cell.getIsGrouped() && columnDef.GroupedCell
                ? columnDef.GroupedCell({
                    cell,
                    column,
                    row,
                    table,
                })
                : undefined;
    const isGroupedValue = renderedCellValue !== undefined;
    if (!isGroupedValue) {
        renderedCellValue = cell.renderValue();
    }
    if (enableFilterMatchHighlighting &&
        columnDef.enableFilterMatchHighlighting !== false &&
        String(renderedCellValue) &&
        allowedTypes.includes(typeof renderedCellValue) &&
        ((filterValue &&
            allowedTypes.includes(typeof filterValue) &&
            ['autocomplete', 'text'].includes(columnDef.filterVariant)) ||
            (globalFilter &&
                allowedTypes.includes(typeof globalFilter) &&
                column.getCanGlobalFilter()))) {
        const chunks = highlightWords === null || highlightWords === void 0 ? void 0 : highlightWords({
            matchExactly: (filterValue ? columnDef._filterFn : globalFilterFn) !== 'fuzzy',
            query: ((_a = filterValue !== null && filterValue !== void 0 ? filterValue : globalFilter) !== null && _a !== void 0 ? _a : '').toString(),
            text: renderedCellValue === null || renderedCellValue === void 0 ? void 0 : renderedCellValue.toString(),
        });
        if ((chunks === null || chunks === void 0 ? void 0 : chunks.length) > 1 || ((_b = chunks === null || chunks === void 0 ? void 0 : chunks[0]) === null || _b === void 0 ? void 0 : _b.match)) {
            renderedCellValue = (jsx("span", { "aria-label": renderedCellValue, role: "note", children: (_c = chunks === null || chunks === void 0 ? void 0 : chunks.map(({ key, match, text }) => (jsx(Box, { "aria-hidden": "true", component: "span", sx: match
                        ? {
                            backgroundColor: matchHighlightColor,
                            borderRadius: '2px',
                            color: (theme) => theme.palette.mode === 'dark'
                                ? theme.palette.common.white
                                : theme.palette.common.black,
                            padding: '2px 1px',
                        }
                        : undefined, children: text }, key)))) !== null && _c !== void 0 ? _c : renderedCellValue }));
        }
    }
    if (columnDef.Cell && !isGroupedValue) {
        renderedCellValue = columnDef.Cell({
            cell,
            column,
            renderedCellValue,
            row,
            rowRef,
            staticColumnIndex,
            staticRowIndex,
            table,
        });
    }
    return renderedCellValue;
};

const MRT_CopyButton = (_a) => {
    var _b;
    var { cell, table } = _a, rest = __rest(_a, ["cell", "table"]);
    const { options: { localization, muiCopyButtonProps }, } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const [copied, setCopied] = useState(false);
    const handleCopy = (event, text) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
    };
    const buttonProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiCopyButtonProps, {
        cell,
        column,
        row,
        table,
    })), parseFromValuesOrFunc(columnDef.muiCopyButtonProps, {
        cell,
        column,
        row,
        table,
    })), rest);
    return (jsx(Tooltip, Object.assign({}, getCommonTooltipProps('top'), { title: (_b = buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.title) !== null && _b !== void 0 ? _b : (copied ? localization.copiedToClipboard : localization.clickToCopy), children: jsx(Button, Object.assign({ onClick: (e) => handleCopy(e, cell.getValue()), size: "small", type: "button", variant: "text" }, buttonProps, { sx: (theme) => (Object.assign({ backgroundColor: 'transparent', border: 'none', color: 'inherit', cursor: 'copy', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', m: '-0.25rem', minWidth: 'unset', py: 0, textAlign: 'inherit', textTransform: 'inherit' }, parseFromValuesOrFunc(buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.sx, theme))), title: undefined })) })));
};

const MRT_EditCellTextField = (_a) => {
    var _b, _c;
    var { cell, table } = _a, rest = __rest(_a, ["cell", "table"]);
    const { getState, options: { createDisplayMode, editDisplayMode, muiEditTextFieldProps }, refs: { editInputRefs }, setCreatingRow, setEditingCell, setEditingRow, } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const { creatingRow, editingRow } = getState();
    const { editSelectOptions, editVariant } = columnDef;
    const isCreating = (creatingRow === null || creatingRow === void 0 ? void 0 : creatingRow.id) === row.id;
    const isEditing = (editingRow === null || editingRow === void 0 ? void 0 : editingRow.id) === row.id;
    const [value, setValue] = useState(() => cell.getValue());
    const textFieldProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiEditTextFieldProps, {
        cell,
        column,
        row,
        table,
    })), parseFromValuesOrFunc(columnDef.muiEditTextFieldProps, {
        cell,
        column,
        row,
        table,
    })), rest);
    const selectOptions = parseFromValuesOrFunc(editSelectOptions, {
        cell,
        column,
        row,
        table,
    });
    const isSelectEdit = editVariant === 'select' || (textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.select);
    const saveInputValueToRowCache = (newValue) => {
        //@ts-ignore
        row._valuesCache[column.id] = newValue;
        if (isCreating) {
            setCreatingRow(row);
        }
        else if (isEditing) {
            setEditingRow(row);
        }
    };
    const handleChange = (event) => {
        var _a;
        (_a = textFieldProps.onChange) === null || _a === void 0 ? void 0 : _a.call(textFieldProps, event);
        setValue(event.target.value);
        if (isSelectEdit) {
            saveInputValueToRowCache(event.target.value);
        }
    };
    const handleBlur = (event) => {
        var _a;
        (_a = textFieldProps.onBlur) === null || _a === void 0 ? void 0 : _a.call(textFieldProps, event);
        saveInputValueToRowCache(value);
        setEditingCell(null);
    };
    const handleEnterKeyDown = (event) => {
        var _a, _b;
        (_a = textFieldProps.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(textFieldProps, event);
        if (event.key === 'Enter' && !event.shiftKey) {
            (_b = editInputRefs.current[column.id]) === null || _b === void 0 ? void 0 : _b.blur();
        }
    };
    if (columnDef.Edit) {
        return jsx(Fragment, { children: (_b = columnDef.Edit) === null || _b === void 0 ? void 0 : _b.call(columnDef, { cell, column, row, table }) });
    }
    return (jsx(TextField, Object.assign({ disabled: parseFromValuesOrFunc(columnDef.enableEditing, row) === false, fullWidth: true, inputRef: (inputRef) => {
            if (inputRef) {
                editInputRefs.current[column.id] = inputRef;
                if (textFieldProps.inputRef) {
                    textFieldProps.inputRef = inputRef;
                }
            }
        }, label: ['custom', 'modal'].includes((isCreating ? createDisplayMode : editDisplayMode))
            ? columnDef.header
            : undefined, margin: "none", name: column.id, placeholder: !['custom', 'modal'].includes((isCreating ? createDisplayMode : editDisplayMode))
            ? columnDef.header
            : undefined, select: isSelectEdit, size: "small", value: value !== null && value !== void 0 ? value : '', variant: "standard" }, textFieldProps, { InputProps: Object.assign(Object.assign(Object.assign({}, (textFieldProps.variant !== 'outlined'
            ? { disableUnderline: editDisplayMode === 'table' }
            : {})), textFieldProps.InputProps), { sx: (theme) => {
                var _a;
                return (Object.assign({ mb: 0 }, parseFromValuesOrFunc((_a = textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.InputProps) === null || _a === void 0 ? void 0 : _a.sx, theme)));
            } }), SelectProps: {
            MenuProps: { disableScrollLock: true },
        }, inputProps: Object.assign({ autoComplete: 'new-password' }, textFieldProps.inputProps), onBlur: handleBlur, onChange: handleChange, onClick: (e) => {
            var _a;
            e.stopPropagation();
            (_a = textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.onClick) === null || _a === void 0 ? void 0 : _a.call(textFieldProps, e);
        }, onKeyDown: handleEnterKeyDown, children: (_c = textFieldProps.children) !== null && _c !== void 0 ? _c : selectOptions === null || selectOptions === void 0 ? void 0 : selectOptions.map((option) => {
            const { label, value } = getValueAndLabel(option);
            return (jsx(MenuItem, { sx: {
                    alignItems: 'center',
                    display: 'flex',
                    gap: '0.5rem',
                    m: 0,
                }, value: value, children: label }, value));
        }) })));
};

const MRT_TableBodyCell = (_a) => {
    var _b, _c, _d, _e, _f;
    var { cell, numRows, rowRef, staticColumnIndex, staticRowIndex, table } = _a, rest = __rest(_a, ["cell", "numRows", "rowRef", "staticColumnIndex", "staticRowIndex", "table"]);
    const theme = useTheme();
    const { getState, options: { columnResizeDirection, columnResizeMode, createDisplayMode, editDisplayMode, enableCellActions, enableClickToCopy, enableColumnOrdering, enableColumnPinning, enableGrouping, layoutMode, mrtTheme: { draggingBorderColor }, muiSkeletonProps, muiTableBodyCellProps, }, setHoveredColumn, } = table;
    const { actionCell, columnSizingInfo, creatingRow, density, draggingColumn, draggingRow, editingCell, editingRow, hoveredColumn, hoveredRow, isLoading, showSkeletons, } = getState();
    const { column, row } = cell;
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const args = { cell, column, row, table };
    const tableCellProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableBodyCellProps, args)), parseFromValuesOrFunc(columnDef.muiTableBodyCellProps, args)), rest);
    const skeletonProps = parseFromValuesOrFunc(muiSkeletonProps, {
        cell,
        column,
        row,
        table,
    });
    const [skeletonWidth, setSkeletonWidth] = useState(100);
    useEffect(() => {
        if ((!isLoading && !showSkeletons) || skeletonWidth !== 100)
            return;
        const size = column.getSize();
        setSkeletonWidth(columnDefType === 'display'
            ? size / 2
            : Math.round(Math.random() * (size - size / 3) + size / 3));
    }, [isLoading, showSkeletons]);
    const draggingBorders = useMemo(() => {
        const isDraggingColumn = (draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id) === column.id;
        const isHoveredColumn = (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === column.id;
        const isDraggingRow = (draggingRow === null || draggingRow === void 0 ? void 0 : draggingRow.id) === row.id;
        const isHoveredRow = (hoveredRow === null || hoveredRow === void 0 ? void 0 : hoveredRow.id) === row.id;
        const isFirstColumn = column.getIsFirstColumn();
        const isLastColumn = column.getIsLastColumn();
        const isLastRow = numRows && staticRowIndex === numRows - 1;
        const isResizingColumn = columnSizingInfo.isResizingColumn === column.id;
        const showResizeBorder = isResizingColumn && columnResizeMode === 'onChange';
        const borderStyle = showResizeBorder
            ? `2px solid ${draggingBorderColor} !important`
            : isDraggingColumn || isDraggingRow
                ? `1px dashed ${theme.palette.grey[500]} !important`
                : isHoveredColumn || isHoveredRow || isResizingColumn
                    ? `2px dashed ${draggingBorderColor} !important`
                    : undefined;
        if (showResizeBorder) {
            return columnResizeDirection === 'ltr'
                ? { borderRight: borderStyle }
                : { borderLeft: borderStyle };
        }
        return borderStyle
            ? {
                borderBottom: isDraggingRow || isHoveredRow || (isLastRow && !isResizingColumn)
                    ? borderStyle
                    : undefined,
                borderLeft: isDraggingColumn ||
                    isHoveredColumn ||
                    ((isDraggingRow || isHoveredRow) && isFirstColumn)
                    ? borderStyle
                    : undefined,
                borderRight: isDraggingColumn ||
                    isHoveredColumn ||
                    ((isDraggingRow || isHoveredRow) && isLastColumn)
                    ? borderStyle
                    : undefined,
                borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
            }
            : undefined;
    }, [
        columnSizingInfo.isResizingColumn,
        draggingColumn,
        draggingRow,
        hoveredColumn,
        hoveredRow,
        staticRowIndex,
    ]);
    const isColumnPinned = enableColumnPinning &&
        columnDef.columnDefType !== 'group' &&
        column.getIsPinned();
    const isEditable = isCellEditable({ cell, table });
    const isEditing = isEditable &&
        !['custom', 'modal'].includes(editDisplayMode) &&
        (editDisplayMode === 'table' ||
            (editingRow === null || editingRow === void 0 ? void 0 : editingRow.id) === row.id ||
            (editingCell === null || editingCell === void 0 ? void 0 : editingCell.id) === cell.id) &&
        !row.getIsGrouped();
    const isCreating = isEditable && createDisplayMode === 'row' && (creatingRow === null || creatingRow === void 0 ? void 0 : creatingRow.id) === row.id;
    const showClickToCopyButton = (parseFromValuesOrFunc(enableClickToCopy, cell) === true ||
        parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) === true) &&
        !['context-menu', false].includes(
        // @ts-ignore
        parseFromValuesOrFunc(columnDef.enableClickToCopy, cell));
    const isRightClickable = parseFromValuesOrFunc(enableCellActions, cell);
    const cellValueProps = {
        cell,
        table,
    };
    const handleDoubleClick = (event) => {
        var _a;
        (_a = tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.onDoubleClick) === null || _a === void 0 ? void 0 : _a.call(tableCellProps, event);
        openEditingCell({ cell, table });
    };
    const handleDragEnter = (e) => {
        var _a;
        (_a = tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.onDragEnter) === null || _a === void 0 ? void 0 : _a.call(tableCellProps, e);
        if (enableGrouping && (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === 'drop-zone') {
            setHoveredColumn(null);
        }
        if (enableColumnOrdering && draggingColumn) {
            setHoveredColumn(columnDef.enableColumnOrdering !== false ? column : null);
        }
    };
    const handleDragOver = (e) => {
        if (columnDef.enableColumnOrdering !== false) {
            e.preventDefault();
        }
    };
    const handleContextMenu = (e) => {
        var _a;
        (_a = tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.onContextMenu) === null || _a === void 0 ? void 0 : _a.call(tableCellProps, e);
        if (isRightClickable) {
            e.preventDefault();
            table.setActionCell(cell);
            table.refs.actionCellRef.current = e.currentTarget;
        }
    };
    return (jsx(TableCell, Object.assign({ align: theme.direction === 'rtl' ? 'right' : 'left', "data-index": staticColumnIndex, "data-pinned": !!isColumnPinned || undefined }, tableCellProps, { onContextMenu: handleContextMenu, onDoubleClick: handleDoubleClick, onDragEnter: handleDragEnter, onDragOver: handleDragOver, sx: (theme) => (Object.assign(Object.assign({ '&:hover': {
                outline: (actionCell === null || actionCell === void 0 ? void 0 : actionCell.id) === cell.id ||
                    (editDisplayMode === 'cell' && isEditable) ||
                    (editDisplayMode === 'table' && (isCreating || isEditing))
                    ? `1px solid ${theme.palette.grey[500]}`
                    : undefined,
                textOverflow: 'clip',
            }, alignItems: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'center' : undefined, cursor: isRightClickable
                ? 'context-menu'
                : isEditable && editDisplayMode === 'cell'
                    ? 'pointer'
                    : 'inherit', outline: (actionCell === null || actionCell === void 0 ? void 0 : actionCell.id) === cell.id
                ? `1px solid ${theme.palette.grey[500]}`
                : undefined, outlineOffset: '-1px', overflow: 'hidden', p: density === 'compact'
                ? columnDefType === 'display'
                    ? '0 0.5rem'
                    : '0.5rem'
                : density === 'comfortable'
                    ? columnDefType === 'display'
                        ? '0.5rem 0.75rem'
                        : '1rem'
                    : columnDefType === 'display'
                        ? '1rem 1.25rem'
                        : '1.5rem', textOverflow: columnDefType !== 'display' ? 'ellipsis' : undefined, whiteSpace: row.getIsPinned() || density === 'compact' ? 'nowrap' : 'normal' }, getCommonMRTCellStyles({
            column,
            table,
            tableCellProps,
            theme,
        })), draggingBorders)), children: (_b = tableCellProps.children) !== null && _b !== void 0 ? _b : (jsxs(Fragment, { children: [cell.getIsPlaceholder() ? ((_d = (_c = columnDef.PlaceholderCell) === null || _c === void 0 ? void 0 : _c.call(columnDef, { cell, column, row, table })) !== null && _d !== void 0 ? _d : null) : showSkeletons !== false && (isLoading || showSkeletons) ? (jsx(Skeleton, Object.assign({ animation: "wave", height: 20, width: skeletonWidth }, skeletonProps))) : columnDefType === 'display' &&
                    (['mrt-row-expand', 'mrt-row-numbers', 'mrt-row-select'].includes(column.id) ||
                        !row.getIsGrouped()) ? ((_e = columnDef.Cell) === null || _e === void 0 ? void 0 : _e.call(columnDef, {
                    cell,
                    column,
                    renderedCellValue: cell.renderValue(),
                    row,
                    rowRef,
                    staticColumnIndex,
                    staticRowIndex,
                    table,
                })) : isCreating || isEditing ? (jsx(MRT_EditCellTextField, { cell: cell, table: table })) : showClickToCopyButton && columnDef.enableClickToCopy !== false ? (jsx(MRT_CopyButton, { cell: cell, table: table, children: jsx(MRT_TableBodyCellValue, Object.assign({}, cellValueProps)) })) : (jsx(MRT_TableBodyCellValue, Object.assign({}, cellValueProps))), cell.getIsGrouped() && !columnDef.GroupedCell && (jsxs(Fragment, { children: [" (", (_f = row.subRows) === null || _f === void 0 ? void 0 : _f.length, ")"] }))] })) })));
};
const Memo_MRT_TableBodyCell = memo(MRT_TableBodyCell, (prev, next) => next.cell === prev.cell);

const MRT_TableDetailPanel = (_a) => {
    var { parentRowRef, row, rowVirtualizer, staticRowIndex, table, virtualRow } = _a, rest = __rest(_a, ["parentRowRef", "row", "rowVirtualizer", "staticRowIndex", "table", "virtualRow"]);
    const { getState, getVisibleLeafColumns, options: { layoutMode, mrtTheme: { baseBackgroundColor }, muiDetailPanelProps, muiTableBodyRowProps, renderDetailPanel, }, } = table;
    const { isLoading } = getState();
    const tableRowProps = parseFromValuesOrFunc(muiTableBodyRowProps, {
        isDetailPanel: true,
        row,
        staticRowIndex,
        table,
    });
    const tableCellProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiDetailPanelProps, {
        row,
        table,
    })), rest);
    const DetailPanel = !isLoading && (renderDetailPanel === null || renderDetailPanel === void 0 ? void 0 : renderDetailPanel({ row, table }));
    return (jsx(TableRow, Object.assign({ className: "Mui-TableBodyCell-DetailPanel", "data-index": renderDetailPanel ? staticRowIndex * 2 + 1 : staticRowIndex, ref: (node) => {
            var _a;
            if (node) {
                (_a = rowVirtualizer === null || rowVirtualizer === void 0 ? void 0 : rowVirtualizer.measureElement) === null || _a === void 0 ? void 0 : _a.call(rowVirtualizer, node);
            }
        } }, tableRowProps, { sx: (theme) => {
            var _a, _b;
            return (Object.assign({ display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'flex' : undefined, position: virtualRow ? 'absolute' : undefined, top: virtualRow
                    ? `${(_b = (_a = parentRowRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.height}px`
                    : undefined, transform: virtualRow
                    ? `translateY(${virtualRow === null || virtualRow === void 0 ? void 0 : virtualRow.start}px)`
                    : undefined, width: '100%' }, parseFromValuesOrFunc(tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.sx, theme)));
        }, children: jsx(TableCell, Object.assign({ className: "Mui-TableBodyCell-DetailPanel", colSpan: getVisibleLeafColumns().length }, tableCellProps, { sx: (theme) => (Object.assign({ backgroundColor: virtualRow ? baseBackgroundColor : undefined, borderBottom: !row.getIsExpanded() ? 'none' : undefined, display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'flex' : undefined, py: !!DetailPanel && row.getIsExpanded() ? '1rem' : 0, transition: !virtualRow ? 'all 150ms ease-in-out' : undefined, width: `100%` }, parseFromValuesOrFunc(tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.sx, theme))), children: virtualRow ? (row.getIsExpanded() && DetailPanel) : (jsx(Collapse, { in: row.getIsExpanded(), mountOnEnter: true, unmountOnExit: true, children: DetailPanel })) })) })));
};

const MRT_TableBodyRow = (_a) => {
    var _b, _c, _d, _f;
    var { columnVirtualizer, numRows, pinnedRowIds, row, rowVirtualizer, staticRowIndex, table, virtualRow } = _a, rest = __rest(_a, ["columnVirtualizer", "numRows", "pinnedRowIds", "row", "rowVirtualizer", "staticRowIndex", "table", "virtualRow"]);
    const theme = useTheme();
    const { getState, options: { enableRowOrdering, enableRowPinning, enableStickyFooter, enableStickyHeader, layoutMode, memoMode, mrtTheme: { baseBackgroundColor, pinnedRowBackgroundColor, selectedRowBackgroundColor, }, muiTableBodyRowProps, renderDetailPanel, rowPinningDisplayMode, }, refs: { tableFooterRef, tableHeadRef }, setHoveredRow, } = table;
    const { density, draggingColumn, draggingRow, editingCell, editingRow, hoveredRow, isFullScreen, rowPinning, } = getState();
    const visibleCells = row.getVisibleCells();
    const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } = columnVirtualizer !== null && columnVirtualizer !== void 0 ? columnVirtualizer : {};
    const isRowSelected = getIsRowSelected({ row, table });
    const isRowPinned = enableRowPinning && row.getIsPinned();
    const isDraggingRow = (draggingRow === null || draggingRow === void 0 ? void 0 : draggingRow.id) === row.id;
    const isHoveredRow = (hoveredRow === null || hoveredRow === void 0 ? void 0 : hoveredRow.id) === row.id;
    const tableRowProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableBodyRowProps, {
        row,
        staticRowIndex,
        table,
    })), rest);
    const [bottomPinnedIndex, topPinnedIndex] = useMemo(() => {
        if (!enableRowPinning ||
            !(rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky')) ||
            !pinnedRowIds ||
            !row.getIsPinned())
            return [];
        return [
            [...pinnedRowIds].reverse().indexOf(row.id),
            pinnedRowIds.indexOf(row.id),
        ];
    }, [pinnedRowIds, rowPinning]);
    const tableHeadHeight = ((enableStickyHeader || isFullScreen) &&
        ((_b = tableHeadRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight)) ||
        0;
    const tableFooterHeight = (enableStickyFooter && ((_c = tableFooterRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight)) || 0;
    const sx = parseFromValuesOrFunc(tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.sx, theme);
    const defaultRowHeight = density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69;
    const customRowHeight = 
    // @ts-ignore
    parseInt((_f = (_d = tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.style) === null || _d === void 0 ? void 0 : _d.height) !== null && _f !== void 0 ? _f : sx === null || sx === void 0 ? void 0 : sx.height, 10) || undefined;
    const rowHeight = customRowHeight || defaultRowHeight;
    const handleDragEnter = (_e) => {
        if (enableRowOrdering && draggingRow) {
            setHoveredRow(row);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const rowRef = useRef(null);
    const cellHighlightColor = isRowSelected
        ? selectedRowBackgroundColor
        : isRowPinned
            ? pinnedRowBackgroundColor
            : undefined;
    const cellHighlightColorHover = (tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.hover) !== false
        ? isRowSelected
            ? cellHighlightColor
            : theme.palette.mode === 'dark'
                ? `${lighten(baseBackgroundColor, 0.3)}`
                : `${darken(baseBackgroundColor, 0.3)}`
        : undefined;
    return (jsxs(Fragment, { children: [jsxs(TableRow, Object.assign({ "data-index": renderDetailPanel ? staticRowIndex * 2 : staticRowIndex, "data-pinned": !!isRowPinned || undefined, "data-selected": isRowSelected || undefined, onDragEnter: handleDragEnter, onDragOver: handleDragOver, ref: (node) => {
                    if (node) {
                        rowRef.current = node;
                        rowVirtualizer === null || rowVirtualizer === void 0 ? void 0 : rowVirtualizer.measureElement(node);
                    }
                }, selected: isRowSelected }, tableRowProps, { style: Object.assign({ transform: virtualRow
                        ? `translateY(${virtualRow.start}px)`
                        : undefined }, tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.style), sx: (theme) => (Object.assign({ '&:hover td:after': cellHighlightColorHover
                        ? Object.assign({ backgroundColor: alpha(cellHighlightColorHover, 0.3) }, commonCellBeforeAfterStyles) : undefined, backgroundColor: `${baseBackgroundColor} !important`, bottom: !virtualRow && bottomPinnedIndex !== undefined && isRowPinned
                        ? `${bottomPinnedIndex * rowHeight +
                            (enableStickyFooter ? tableFooterHeight - 1 : 0)}px`
                        : undefined, boxSizing: 'border-box', display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'flex' : undefined, opacity: isRowPinned ? 0.97 : isDraggingRow || isHoveredRow ? 0.5 : 1, position: virtualRow
                        ? 'absolute'
                        : (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky')) && isRowPinned
                            ? 'sticky'
                            : 'relative', td: Object.assign({}, getCommonPinnedCellStyles({ table, theme })), 'td:after': cellHighlightColor
                        ? Object.assign({ backgroundColor: cellHighlightColor }, commonCellBeforeAfterStyles) : undefined, top: virtualRow
                        ? 0
                        : topPinnedIndex !== undefined && isRowPinned
                            ? `${topPinnedIndex * rowHeight +
                                (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)}px`
                            : undefined, transition: virtualRow ? 'none' : 'all 150ms ease-in-out', width: '100%', zIndex: (rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky')) && isRowPinned ? 2 : 0 }, sx)), children: [virtualPaddingLeft ? (jsx("td", { style: { display: 'flex', width: virtualPaddingLeft } })) : null, (virtualColumns !== null && virtualColumns !== void 0 ? virtualColumns : visibleCells).map((cellOrVirtualCell, staticColumnIndex) => {
                        let cell = cellOrVirtualCell;
                        if (columnVirtualizer) {
                            staticColumnIndex = cellOrVirtualCell.index;
                            cell = visibleCells[staticColumnIndex];
                        }
                        const props = {
                            cell,
                            numRows,
                            rowRef,
                            staticColumnIndex,
                            staticRowIndex,
                            table,
                        };
                        return cell ? (memoMode === 'cells' &&
                            cell.column.columnDef.columnDefType === 'data' &&
                            !draggingColumn &&
                            !draggingRow &&
                            (editingCell === null || editingCell === void 0 ? void 0 : editingCell.id) !== cell.id &&
                            (editingRow === null || editingRow === void 0 ? void 0 : editingRow.id) !== row.id ? (jsx(Memo_MRT_TableBodyCell, Object.assign({}, props), cell.id)) : (jsx(MRT_TableBodyCell, Object.assign({}, props), cell.id))) : null;
                    }), virtualPaddingRight ? (jsx("td", { style: { display: 'flex', width: virtualPaddingRight } })) : null] })), renderDetailPanel && !row.getIsGrouped() && (jsx(MRT_TableDetailPanel, { parentRowRef: rowRef, row: row, rowVirtualizer: rowVirtualizer, staticRowIndex: staticRowIndex, table: table, virtualRow: virtualRow }))] }));
};
const Memo_MRT_TableBodyRow = memo(MRT_TableBodyRow, (prev, next) => prev.row === next.row && prev.staticRowIndex === next.staticRowIndex);

const MRT_TableBody = (_a) => {
    var _b, _c, _d, _e, _f, _g;
    var { columnVirtualizer, table } = _a, rest = __rest(_a, ["columnVirtualizer", "table"]);
    const { getBottomRows, getIsSomeRowsPinned, getRowModel, getState, getTopRows, options: { enableStickyFooter, enableStickyHeader, layoutMode, localization, memoMode, muiTableBodyProps, renderDetailPanel, renderEmptyRowsFallback, rowPinningDisplayMode, }, refs: { tableFooterRef, tableHeadRef, tablePaperRef }, } = table;
    const { columnFilters, globalFilter, isFullScreen, rowPinning } = getState();
    const tableBodyProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableBodyProps, { table })), rest);
    const tableHeadHeight = ((enableStickyHeader || isFullScreen) &&
        ((_b = tableHeadRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight)) ||
        0;
    const tableFooterHeight = (enableStickyFooter && ((_c = tableFooterRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight)) || 0;
    const pinnedRowIds = useMemo(() => {
        var _a, _b;
        if (!((_a = rowPinning.bottom) === null || _a === void 0 ? void 0 : _a.length) && !((_b = rowPinning.top) === null || _b === void 0 ? void 0 : _b.length))
            return [];
        return getRowModel()
            .rows.filter((row) => row.getIsPinned())
            .map((r) => r.id);
    }, [rowPinning, getRowModel().rows]);
    const rows = useMRT_Rows(table);
    const rowVirtualizer = useMRT_RowVirtualizer(table, rows);
    const { virtualRows } = rowVirtualizer !== null && rowVirtualizer !== void 0 ? rowVirtualizer : {};
    const commonRowProps = {
        columnVirtualizer,
        numRows: rows.length,
        table,
    };
    return (jsxs(Fragment, { children: [!(rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky')) &&
                getIsSomeRowsPinned('top') && (jsx(TableBody, Object.assign({}, tableBodyProps, { sx: (theme) => (Object.assign({ display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined, position: 'sticky', top: tableHeadHeight - 1, zIndex: 1 }, parseFromValuesOrFunc(tableBodyProps === null || tableBodyProps === void 0 ? void 0 : tableBodyProps.sx, theme))), children: getTopRows().map((row, staticRowIndex) => {
                    const props = Object.assign(Object.assign({}, commonRowProps), { row,
                        staticRowIndex });
                    return memoMode === 'rows' ? (jsx(Memo_MRT_TableBodyRow, Object.assign({}, props), row.id)) : (jsx(MRT_TableBodyRow, Object.assign({}, props), row.id));
                }) }))), jsx(TableBody, Object.assign({}, tableBodyProps, { sx: (theme) => (Object.assign({ display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined, height: rowVirtualizer
                        ? `${rowVirtualizer.getTotalSize()}px`
                        : undefined, minHeight: !rows.length ? '100px' : undefined, position: 'relative' }, parseFromValuesOrFunc(tableBodyProps === null || tableBodyProps === void 0 ? void 0 : tableBodyProps.sx, theme))), children: (_d = tableBodyProps === null || tableBodyProps === void 0 ? void 0 : tableBodyProps.children) !== null && _d !== void 0 ? _d : (!rows.length ? (jsx("tr", { style: {
                        display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined,
                    }, children: jsx("td", { colSpan: table.getVisibleLeafColumns().length, style: {
                            display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined,
                        }, children: (_e = renderEmptyRowsFallback === null || renderEmptyRowsFallback === void 0 ? void 0 : renderEmptyRowsFallback({ table })) !== null && _e !== void 0 ? _e : (jsx(Typography, { sx: {
                                color: 'text.secondary',
                                fontStyle: 'italic',
                                maxWidth: `min(100vw, ${(_g = (_f = tablePaperRef.current) === null || _f === void 0 ? void 0 : _f.clientWidth) !== null && _g !== void 0 ? _g : 360}px)`,
                                py: '2rem',
                                textAlign: 'center',
                                width: '100%',
                            }, children: globalFilter || columnFilters.length
                                ? localization.noResultsFound
                                : localization.noRecordsToDisplay })) }) })) : (jsx(Fragment, { children: (virtualRows !== null && virtualRows !== void 0 ? virtualRows : rows).map((rowOrVirtualRow, staticRowIndex) => {
                        let row = rowOrVirtualRow;
                        if (rowVirtualizer) {
                            if (renderDetailPanel) {
                                if (rowOrVirtualRow.index % 2 === 1) {
                                    return null;
                                }
                                else {
                                    staticRowIndex = rowOrVirtualRow.index / 2;
                                }
                            }
                            else {
                                staticRowIndex = rowOrVirtualRow.index;
                            }
                            row = rows[staticRowIndex];
                        }
                        const props = Object.assign(Object.assign({}, commonRowProps), { pinnedRowIds,
                            row,
                            rowVirtualizer,
                            staticRowIndex, virtualRow: rowVirtualizer
                                ? rowOrVirtualRow
                                : undefined });
                        const key = `${row.id}-${row.index}`;
                        return memoMode === 'rows' ? (jsx(Memo_MRT_TableBodyRow, Object.assign({}, props), key)) : (jsx(MRT_TableBodyRow, Object.assign({}, props), key));
                    }) }))) })), !(rowPinningDisplayMode === null || rowPinningDisplayMode === void 0 ? void 0 : rowPinningDisplayMode.includes('sticky')) &&
                getIsSomeRowsPinned('bottom') && (jsx(TableBody, Object.assign({}, tableBodyProps, { sx: (theme) => (Object.assign({ bottom: tableFooterHeight - 1, display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined, position: 'sticky', zIndex: 1 }, parseFromValuesOrFunc(tableBodyProps === null || tableBodyProps === void 0 ? void 0 : tableBodyProps.sx, theme))), children: getBottomRows().map((row, staticRowIndex) => {
                    const props = Object.assign(Object.assign({}, commonRowProps), { row,
                        staticRowIndex });
                    return memoMode === 'rows' ? (jsx(Memo_MRT_TableBodyRow, Object.assign({}, props), row.id)) : (jsx(MRT_TableBodyRow, Object.assign({}, props), row.id));
                }) })))] }));
};
const Memo_MRT_TableBody = memo(MRT_TableBody, (prev, next) => prev.table.options.data === next.table.options.data);

const MRT_TableFooterCell = (_a) => {
    var _b, _c, _d;
    var { footer, staticColumnIndex, table } = _a, rest = __rest(_a, ["footer", "staticColumnIndex", "table"]);
    const theme = useTheme();
    const { getState, options: { enableColumnPinning, muiTableFooterCellProps }, } = table;
    const { density } = getState();
    const { column } = footer;
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const isColumnPinned = enableColumnPinning &&
        columnDef.columnDefType !== 'group' &&
        column.getIsPinned();
    const args = { column, table };
    const tableCellProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableFooterCellProps, args)), parseFromValuesOrFunc(columnDef.muiTableFooterCellProps, args)), rest);
    return (jsx(TableCell, Object.assign({ align: columnDefType === 'group'
            ? 'center'
            : theme.direction === 'rtl'
                ? 'right'
                : 'left', colSpan: footer.colSpan, "data-index": staticColumnIndex, "data-pinned": !!isColumnPinned || undefined, variant: "footer" }, tableCellProps, { sx: (theme) => (Object.assign(Object.assign({ fontWeight: 'bold', p: density === 'compact'
                ? '0.5rem'
                : density === 'comfortable'
                    ? '1rem'
                    : '1.5rem', verticalAlign: 'top' }, getCommonMRTCellStyles({
            column,
            header: footer,
            table,
            tableCellProps,
            theme,
        })), parseFromValuesOrFunc(tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.sx, theme))), children: (_b = tableCellProps.children) !== null && _b !== void 0 ? _b : (footer.isPlaceholder
            ? null
            : (_d = (_c = parseFromValuesOrFunc(columnDef.Footer, {
                column,
                footer,
                table,
            })) !== null && _c !== void 0 ? _c : columnDef.footer) !== null && _d !== void 0 ? _d : null) })));
};

const MRT_TableFooterRow = (_a) => {
    var _b;
    var { columnVirtualizer, footerGroup, table } = _a, rest = __rest(_a, ["columnVirtualizer", "footerGroup", "table"]);
    const { options: { layoutMode, mrtTheme: { baseBackgroundColor }, muiTableFooterRowProps, }, } = table;
    const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } = columnVirtualizer !== null && columnVirtualizer !== void 0 ? columnVirtualizer : {};
    // if no content in row, skip row
    if (!((_b = footerGroup.headers) === null || _b === void 0 ? void 0 : _b.some((header) => (typeof header.column.columnDef.footer === 'string' &&
        !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer))) {
        return null;
    }
    const tableRowProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableFooterRowProps, {
        footerGroup,
        table,
    })), rest);
    return (jsxs(TableRow, Object.assign({}, tableRowProps, { sx: (theme) => (Object.assign({ backgroundColor: baseBackgroundColor, display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'flex' : undefined, position: 'relative', width: '100%' }, parseFromValuesOrFunc(tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.sx, theme))), children: [virtualPaddingLeft ? (jsx("th", { style: { display: 'flex', width: virtualPaddingLeft } })) : null, (virtualColumns !== null && virtualColumns !== void 0 ? virtualColumns : footerGroup.headers).map((footerOrVirtualFooter, staticColumnIndex) => {
                let footer = footerOrVirtualFooter;
                if (columnVirtualizer) {
                    staticColumnIndex = footerOrVirtualFooter
                        .index;
                    footer = footerGroup.headers[staticColumnIndex];
                }
                return footer ? (jsx(MRT_TableFooterCell, { footer: footer, staticColumnIndex: staticColumnIndex, table: table }, footer.id)) : null;
            }), virtualPaddingRight ? (jsx("th", { style: { display: 'flex', width: virtualPaddingRight } })) : null] })));
};

const MRT_TableFooter = (_a) => {
    var { columnVirtualizer, table } = _a, rest = __rest(_a, ["columnVirtualizer", "table"]);
    const { getFooterGroups, getState, options: { enableStickyFooter, layoutMode, muiTableFooterProps }, refs: { tableFooterRef }, } = table;
    const { isFullScreen } = getState();
    const tableFooterProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableFooterProps, {
        table,
    })), rest);
    const stickFooter = (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;
    return (jsx(TableFooter, Object.assign({}, tableFooterProps, { ref: (ref) => {
            tableFooterRef.current = ref;
            if (tableFooterProps === null || tableFooterProps === void 0 ? void 0 : tableFooterProps.ref) {
                // @ts-ignore
                tableFooterProps.ref.current = ref;
            }
        }, sx: (theme) => (Object.assign({ bottom: stickFooter ? 0 : undefined, display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined, opacity: stickFooter ? 0.97 : undefined, outline: stickFooter
                ? theme.palette.mode === 'light'
                    ? `1px solid ${theme.palette.grey[300]}`
                    : `1px solid ${theme.palette.grey[700]}`
                : undefined, position: stickFooter ? 'sticky' : 'relative', zIndex: stickFooter ? 1 : undefined }, parseFromValuesOrFunc(tableFooterProps === null || tableFooterProps === void 0 ? void 0 : tableFooterProps.sx, theme))), children: getFooterGroups().map((footerGroup) => (jsx(MRT_TableFooterRow, { columnVirtualizer: columnVirtualizer, footerGroup: footerGroup, table: table }, footerGroup.id))) })));
};

const mrtFilterOptions = (localization) => [
    {
        divider: false,
        label: localization.filterFuzzy,
        option: 'fuzzy',
        symbol: '≈',
    },
    {
        divider: false,
        label: localization.filterContains,
        option: 'contains',
        symbol: '*',
    },
    {
        divider: false,
        label: localization.filterStartsWith,
        option: 'startsWith',
        symbol: 'a',
    },
    {
        divider: true,
        label: localization.filterEndsWith,
        option: 'endsWith',
        symbol: 'z',
    },
    {
        divider: false,
        label: localization.filterEquals,
        option: 'equals',
        symbol: '=',
    },
    {
        divider: true,
        label: localization.filterNotEquals,
        option: 'notEquals',
        symbol: '≠',
    },
    {
        divider: false,
        label: localization.filterBetween,
        option: 'between',
        symbol: '⇿',
    },
    {
        divider: true,
        label: localization.filterBetweenInclusive,
        option: 'betweenInclusive',
        symbol: '⬌',
    },
    {
        divider: false,
        label: localization.filterGreaterThan,
        option: 'greaterThan',
        symbol: '>',
    },
    {
        divider: false,
        label: localization.filterGreaterThanOrEqualTo,
        option: 'greaterThanOrEqualTo',
        symbol: '≥',
    },
    {
        divider: false,
        label: localization.filterLessThan,
        option: 'lessThan',
        symbol: '<',
    },
    {
        divider: true,
        label: localization.filterLessThanOrEqualTo,
        option: 'lessThanOrEqualTo',
        symbol: '≤',
    },
    {
        divider: false,
        label: localization.filterEmpty,
        option: 'empty',
        symbol: '∅',
    },
    {
        divider: false,
        label: localization.filterNotEmpty,
        option: 'notEmpty',
        symbol: '!∅',
    },
];
const rangeModes = ['between', 'betweenInclusive', 'inNumberRange'];
const emptyModes = ['empty', 'notEmpty'];
const arrModes = ['arrIncludesSome', 'arrIncludesAll', 'arrIncludes'];
const rangeVariants = ['range-slider', 'date-range', 'datetime-range', 'range'];
const MRT_FilterOptionMenu = (_a) => {
    var _b, _c, _d, _e;
    var { anchorEl, header, onSelect, setAnchorEl, setFilterValue, table } = _a, rest = __rest(_a, ["anchorEl", "header", "onSelect", "setAnchorEl", "setFilterValue", "table"]);
    const { getState, options: { columnFilterModeOptions, globalFilterModeOptions, localization, mrtTheme: { menuBackgroundColor }, renderColumnFilterModeMenuItems, renderGlobalFilterModeMenuItems, }, setColumnFilterFns, setGlobalFilterFn, } = table;
    const { density, globalFilterFn } = getState();
    const { column } = header !== null && header !== void 0 ? header : {};
    const { columnDef } = column !== null && column !== void 0 ? column : {};
    const currentFilterValue = column === null || column === void 0 ? void 0 : column.getFilterValue();
    let allowedColumnFilterOptions = (_b = columnDef === null || columnDef === void 0 ? void 0 : columnDef.columnFilterModeOptions) !== null && _b !== void 0 ? _b : columnFilterModeOptions;
    if (rangeVariants.includes(columnDef === null || columnDef === void 0 ? void 0 : columnDef.filterVariant)) {
        allowedColumnFilterOptions = [
            ...rangeModes,
            ...(allowedColumnFilterOptions !== null && allowedColumnFilterOptions !== void 0 ? allowedColumnFilterOptions : []),
        ].filter((option) => rangeModes.includes(option));
    }
    const internalFilterOptions = useMemo(() => mrtFilterOptions(localization).filter((filterOption) => columnDef
        ? allowedColumnFilterOptions === undefined ||
            (allowedColumnFilterOptions === null || allowedColumnFilterOptions === void 0 ? void 0 : allowedColumnFilterOptions.includes(filterOption.option))
        : (!globalFilterModeOptions ||
            globalFilterModeOptions.includes(filterOption.option)) &&
            ['contains', 'fuzzy', 'startsWith'].includes(filterOption.option)), []);
    const handleSelectFilterMode = (option) => {
        var _a, _b;
        const prevFilterMode = (_a = columnDef === null || columnDef === void 0 ? void 0 : columnDef._filterFn) !== null && _a !== void 0 ? _a : '';
        if (!header || !column) {
            // global filter mode
            setGlobalFilterFn(option);
        }
        else if (option !== prevFilterMode) {
            // column filter mode
            setColumnFilterFns((prev) => (Object.assign(Object.assign({}, prev), { [header.id]: option })));
            // reset filter value and/or perform new filter render
            if (emptyModes.includes(option)) {
                // will now be empty/notEmpty filter mode
                if (currentFilterValue !== ' ' &&
                    !emptyModes.includes(prevFilterMode)) {
                    column.setFilterValue(' ');
                }
                else if (currentFilterValue) {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
            else if ((columnDef === null || columnDef === void 0 ? void 0 : columnDef.filterVariant) === 'multi-select' ||
                arrModes.includes(option)) {
                // will now be array filter mode
                if (currentFilterValue instanceof String ||
                    (currentFilterValue === null || currentFilterValue === void 0 ? void 0 : currentFilterValue.length)) {
                    column.setFilterValue([]);
                    setFilterValue === null || setFilterValue === void 0 ? void 0 : setFilterValue([]);
                }
                else if (currentFilterValue) {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
            else if (((_b = columnDef === null || columnDef === void 0 ? void 0 : columnDef.filterVariant) === null || _b === void 0 ? void 0 : _b.includes('range')) ||
                rangeModes.includes(option)) {
                // will now be range filter mode
                if (!Array.isArray(currentFilterValue) ||
                    (!(currentFilterValue === null || currentFilterValue === void 0 ? void 0 : currentFilterValue.every((v) => v === '')) &&
                        !rangeModes.includes(prevFilterMode))) {
                    column.setFilterValue(['', '']);
                    setFilterValue === null || setFilterValue === void 0 ? void 0 : setFilterValue('');
                }
                else {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
            else {
                // will now be single value filter mode
                if (Array.isArray(currentFilterValue)) {
                    column.setFilterValue('');
                    setFilterValue === null || setFilterValue === void 0 ? void 0 : setFilterValue('');
                }
                else if (currentFilterValue === ' ' &&
                    emptyModes.includes(prevFilterMode)) {
                    column.setFilterValue(undefined);
                }
                else {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
        }
        setAnchorEl(null);
        onSelect === null || onSelect === void 0 ? void 0 : onSelect();
    };
    const filterOption = !!header && columnDef ? columnDef._filterFn : globalFilterFn;
    return (jsx(Menu, Object.assign({ MenuListProps: {
            dense: density === 'compact',
            sx: {
                backgroundColor: menuBackgroundColor,
            },
        }, anchorEl: anchorEl, anchorOrigin: { horizontal: 'right', vertical: 'center' }, disableScrollLock: true, onClose: () => setAnchorEl(null), open: !!anchorEl }, rest, { children: (_e = (header && column && columnDef
            ? (_d = (_c = columnDef.renderColumnFilterModeMenuItems) === null || _c === void 0 ? void 0 : _c.call(columnDef, {
                column: column,
                internalFilterOptions,
                onSelectFilterMode: handleSelectFilterMode,
                table,
            })) !== null && _d !== void 0 ? _d : renderColumnFilterModeMenuItems === null || renderColumnFilterModeMenuItems === void 0 ? void 0 : renderColumnFilterModeMenuItems({
                column: column,
                internalFilterOptions,
                onSelectFilterMode: handleSelectFilterMode,
                table,
            })
            : renderGlobalFilterModeMenuItems === null || renderGlobalFilterModeMenuItems === void 0 ? void 0 : renderGlobalFilterModeMenuItems({
                internalFilterOptions,
                onSelectFilterMode: handleSelectFilterMode,
                table,
            }))) !== null && _e !== void 0 ? _e : internalFilterOptions.map(({ divider, label, option, symbol }, index) => (jsx(MRT_ActionMenuItem, { divider: divider, icon: symbol, label: label, onClick: () => handleSelectFilterMode(option), selected: option === filterOption, table: table, value: option }, index))) })));
};

const MRT_ColumnActionMenu = (_a) => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var { anchorEl, header, setAnchorEl, table } = _a, rest = __rest(_a, ["anchorEl", "header", "setAnchorEl", "table"]);
    const { getAllLeafColumns, getState, options: { columnFilterDisplayMode, columnFilterModeOptions, enableColumnFilterModes, enableColumnFilters, enableColumnPinning, enableColumnResizing, enableGrouping, enableHiding, enableSorting, enableSortingRemoval, icons: { ClearAllIcon, DynamicFeedIcon, FilterListIcon, FilterListOffIcon, PushPinIcon, RestartAltIcon, SortIcon, ViewColumnIcon, VisibilityOffIcon, }, localization, mrtTheme: { menuBackgroundColor }, renderColumnActionsMenuItems, }, refs: { filterInputRefs }, setColumnFilterFns, setColumnOrder, setColumnSizingInfo, setShowColumnFilters, } = table;
    const { column } = header;
    const { columnDef } = column;
    const { columnSizing, columnVisibility, density, showColumnFilters } = getState();
    const columnFilterValue = column.getFilterValue();
    const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
    const handleClearSort = () => {
        column.clearSorting();
        setAnchorEl(null);
    };
    const handleSortAsc = () => {
        column.toggleSorting(false);
        setAnchorEl(null);
    };
    const handleSortDesc = () => {
        column.toggleSorting(true);
        setAnchorEl(null);
    };
    const handleResetColumnSize = () => {
        setColumnSizingInfo((old) => (Object.assign(Object.assign({}, old), { isResizingColumn: false })));
        column.resetSize();
        setAnchorEl(null);
    };
    const handleHideColumn = () => {
        column.toggleVisibility(false);
        setAnchorEl(null);
    };
    const handlePinColumn = (pinDirection) => {
        column.pin(pinDirection);
        setAnchorEl(null);
    };
    const handleGroupByColumn = () => {
        column.toggleGrouping();
        setColumnOrder((old) => ['mrt-row-expand', ...old]);
        setAnchorEl(null);
    };
    const handleClearFilter = () => {
        column.setFilterValue(undefined);
        setAnchorEl(null);
        if (['empty', 'notEmpty'].includes(columnDef._filterFn)) {
            setColumnFilterFns((prev) => {
                var _a;
                return (Object.assign(Object.assign({}, prev), { [header.id]: (_a = allowedColumnFilterOptions === null || allowedColumnFilterOptions === void 0 ? void 0 : allowedColumnFilterOptions[0]) !== null && _a !== void 0 ? _a : 'fuzzy' }));
            });
        }
    };
    const handleFilterByColumn = () => {
        setShowColumnFilters(true);
        queueMicrotask(() => { var _a; return (_a = filterInputRefs.current[`${column.id}-0`]) === null || _a === void 0 ? void 0 : _a.focus(); });
        setAnchorEl(null);
    };
    const handleShowAllColumns = () => {
        getAllLeafColumns()
            .filter((col) => col.columnDef.enableHiding !== false)
            .forEach((col) => col.toggleVisibility(true));
        setAnchorEl(null);
    };
    const handleOpenFilterModeMenu = (event) => {
        event.stopPropagation();
        setFilterMenuAnchorEl(event.currentTarget);
    };
    const isSelectFilter = !!columnDef.filterSelectOptions;
    const allowedColumnFilterOptions = (_b = columnDef === null || columnDef === void 0 ? void 0 : columnDef.columnFilterModeOptions) !== null && _b !== void 0 ? _b : columnFilterModeOptions;
    const showFilterModeSubMenu = enableColumnFilterModes &&
        columnDef.enableColumnFilterModes !== false &&
        !isSelectFilter &&
        (allowedColumnFilterOptions === undefined ||
            !!(allowedColumnFilterOptions === null || allowedColumnFilterOptions === void 0 ? void 0 : allowedColumnFilterOptions.length));
    const internalColumnMenuItems = [
        ...(enableSorting && column.getCanSort()
            ? [
                enableSortingRemoval !== false && (jsx(MRT_ActionMenuItem, { icon: jsx(ClearAllIcon, {}), label: localization.clearSort, onClick: handleClearSort, table: table }, 0)),
                jsx(MRT_ActionMenuItem, { disabled: column.getIsSorted() === 'asc', icon: jsx(SortIcon, { style: { transform: 'rotate(180deg) scaleX(-1)' } }), label: (_c = localization.sortByColumnAsc) === null || _c === void 0 ? void 0 : _c.replace('{column}', String(columnDef.header)), onClick: handleSortAsc, table: table }, 1),
                jsx(MRT_ActionMenuItem, { disabled: column.getIsSorted() === 'desc', divider: enableColumnFilters || enableGrouping || enableHiding, icon: jsx(SortIcon, {}), label: (_d = localization.sortByColumnDesc) === null || _d === void 0 ? void 0 : _d.replace('{column}', String(columnDef.header)), onClick: handleSortDesc, table: table }, 2),
            ]
            : []),
        ...(enableColumnFilters && column.getCanFilter()
            ? [
                jsx(MRT_ActionMenuItem, { disabled: !columnFilterValue ||
                        (Array.isArray(columnFilterValue) &&
                            !columnFilterValue.filter((value) => value).length), icon: jsx(FilterListOffIcon, {}), label: localization.clearFilter, onClick: handleClearFilter, table: table }, 3),
                columnFilterDisplayMode === 'subheader' && (jsx(MRT_ActionMenuItem, { disabled: showColumnFilters && !enableColumnFilterModes, divider: enableGrouping || enableHiding, icon: jsx(FilterListIcon, {}), label: (_e = localization.filterByColumn) === null || _e === void 0 ? void 0 : _e.replace('{column}', String(columnDef.header)), onClick: showColumnFilters
                        ? handleOpenFilterModeMenu
                        : handleFilterByColumn, onOpenSubMenu: showFilterModeSubMenu ? handleOpenFilterModeMenu : undefined, table: table }, 4)),
                showFilterModeSubMenu && (jsx(MRT_FilterOptionMenu, { anchorEl: filterMenuAnchorEl, header: header, onSelect: handleFilterByColumn, setAnchorEl: setFilterMenuAnchorEl, table: table }, 5)),
            ].filter(Boolean)
            : []),
        ...(enableGrouping && column.getCanGroup()
            ? [
                jsx(MRT_ActionMenuItem, { divider: enableColumnPinning, icon: jsx(DynamicFeedIcon, {}), label: (_f = localization[column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn']) === null || _f === void 0 ? void 0 : _f.replace('{column}', String(columnDef.header)), onClick: handleGroupByColumn, table: table }, 6),
            ]
            : []),
        ...(enableColumnPinning && column.getCanPin()
            ? [
                jsx(MRT_ActionMenuItem, { disabled: column.getIsPinned() === 'left' || !column.getCanPin(), icon: jsx(PushPinIcon, { style: { transform: 'rotate(90deg)' } }), label: localization.pinToLeft, onClick: () => handlePinColumn('left'), table: table }, 7),
                jsx(MRT_ActionMenuItem, { disabled: column.getIsPinned() === 'right' || !column.getCanPin(), icon: jsx(PushPinIcon, { style: { transform: 'rotate(-90deg)' } }), label: localization.pinToRight, onClick: () => handlePinColumn('right'), table: table }, 8),
                jsx(MRT_ActionMenuItem, { disabled: !column.getIsPinned(), divider: enableHiding, icon: jsx(PushPinIcon, {}), label: localization.unpin, onClick: () => handlePinColumn(false), table: table }, 9),
            ]
            : []),
        ...(enableColumnResizing && column.getCanResize()
            ? [
                jsx(MRT_ActionMenuItem, { disabled: !columnSizing[column.id], icon: jsx(RestartAltIcon, {}), label: localization.resetColumnSize, onClick: handleResetColumnSize, table: table }, 10),
            ]
            : []),
        ...(enableHiding
            ? [
                jsx(MRT_ActionMenuItem, { disabled: !column.getCanHide(), icon: jsx(VisibilityOffIcon, {}), label: (_g = localization.hideColumn) === null || _g === void 0 ? void 0 : _g.replace('{column}', String(columnDef.header)), onClick: handleHideColumn, table: table }, 11),
                jsx(MRT_ActionMenuItem, { disabled: !Object.values(columnVisibility).filter((visible) => !visible)
                        .length, icon: jsx(ViewColumnIcon, {}), label: (_h = localization.showAllColumns) === null || _h === void 0 ? void 0 : _h.replace('{column}', String(columnDef.header)), onClick: handleShowAllColumns, table: table }, 12),
            ]
            : []),
    ].filter(Boolean);
    return (jsx(Menu, Object.assign({ MenuListProps: {
            dense: density === 'compact',
            sx: {
                backgroundColor: menuBackgroundColor,
            },
        }, anchorEl: anchorEl, disableScrollLock: true, onClose: () => setAnchorEl(null), open: !!anchorEl }, rest, { children: (_l = (_k = (_j = columnDef.renderColumnActionsMenuItems) === null || _j === void 0 ? void 0 : _j.call(columnDef, {
            closeMenu: () => setAnchorEl(null),
            column,
            internalColumnMenuItems,
            table,
        })) !== null && _k !== void 0 ? _k : renderColumnActionsMenuItems === null || renderColumnActionsMenuItems === void 0 ? void 0 : renderColumnActionsMenuItems({
            closeMenu: () => setAnchorEl(null),
            column,
            internalColumnMenuItems,
            table,
        })) !== null && _l !== void 0 ? _l : internalColumnMenuItems })));
};

const MRT_TableHeadCellColumnActionsButton = (_a) => {
    var _b, _c;
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    const { options: { icons: { MoreVertIcon }, localization, muiColumnActionsButtonProps, }, } = table;
    const { column } = header;
    const { columnDef } = column;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const iconButtonProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiColumnActionsButtonProps, {
        column,
        table,
    })), parseFromValuesOrFunc(columnDef.muiColumnActionsButtonProps, {
        column,
        table,
    })), rest);
    return (jsxs(Fragment, { children: [jsx(Tooltip, Object.assign({}, getCommonTooltipProps('top'), { title: (_b = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.title) !== null && _b !== void 0 ? _b : localization.columnActions, children: jsx(IconButton, Object.assign({ "aria-label": localization.columnActions, onClick: handleClick, size: "small" }, iconButtonProps, { sx: (theme) => (Object.assign({ '&:hover': {
                            opacity: 1,
                        }, height: '2rem', m: '-8px -4px', opacity: 0.3, transition: 'all 150ms', width: '2rem' }, parseFromValuesOrFunc(iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.sx, theme))), title: undefined, children: (_c = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.children) !== null && _c !== void 0 ? _c : (jsx(MoreVertIcon, { style: { transform: 'scale(0.9)' } })) })) })), anchorEl && (jsx(MRT_ColumnActionMenu, { anchorEl: anchorEl, header: header, setAnchorEl: setAnchorEl, table: table }))] }));
};

const MRT_FilterCheckbox = (_a) => {
    var _b, _c, _d;
    var { column, table } = _a, rest = __rest(_a, ["column", "table"]);
    const { getState, options: { localization, muiFilterCheckboxProps }, } = table;
    const { density } = getState();
    const { columnDef } = column;
    const checkboxProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterCheckboxProps, {
        column,
        table,
    })), parseFromValuesOrFunc(columnDef.muiFilterCheckboxProps, {
        column,
        table,
    })), rest);
    const filterLabel = (_b = localization.filterByColumn) === null || _b === void 0 ? void 0 : _b.replace('{column}', columnDef.header);
    return (jsx(Tooltip, Object.assign({}, getCommonTooltipProps(), { title: (_c = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.title) !== null && _c !== void 0 ? _c : filterLabel, children: jsx(FormControlLabel, { control: jsx(Checkbox, Object.assign({ checked: column.getFilterValue() === 'true', color: column.getFilterValue() === undefined ? 'default' : 'primary', indeterminate: column.getFilterValue() === undefined, size: density === 'compact' ? 'small' : 'medium' }, checkboxProps, { onChange: (e, checked) => {
                    var _a;
                    column.setFilterValue(column.getFilterValue() === undefined
                        ? 'true'
                        : column.getFilterValue() === 'true'
                            ? 'false'
                            : undefined);
                    (_a = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onChange) === null || _a === void 0 ? void 0 : _a.call(checkboxProps, e, checked);
                }, onClick: (e) => {
                    var _a;
                    e.stopPropagation();
                    (_a = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onClick) === null || _a === void 0 ? void 0 : _a.call(checkboxProps, e);
                }, sx: (theme) => (Object.assign({ height: '2.5rem', width: '2.5rem' }, parseFromValuesOrFunc(checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.sx, theme))) })), disableTypography: true, label: (_d = checkboxProps.title) !== null && _d !== void 0 ? _d : filterLabel, sx: { color: 'text.secondary', fontWeight: 'normal', mt: '-4px' }, title: undefined }) })));
};

const MRT_FilterTextField = (_a) => {
    var _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var { header, rangeFilterIndex, table } = _a, rest = __rest(_a, ["header", "rangeFilterIndex", "table"]);
    const { options: { enableColumnFilterModes, icons: { CloseIcon, FilterListIcon }, localization, muiFilterAutocompleteProps, muiFilterDatePickerProps, muiFilterDateTimePickerProps, muiFilterTextFieldProps, muiFilterTimePickerProps, }, refs: { filterInputRefs }, setColumnFilterFns, } = table;
    const { column } = header;
    const { columnDef } = column;
    const { filterVariant } = columnDef;
    const [isPending, startTransition] = useTransition();
    const args = { column, rangeFilterIndex, table };
    const textFieldProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterTextFieldProps, args)), parseFromValuesOrFunc(columnDef.muiFilterTextFieldProps, args)), rest);
    const autocompleteProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterAutocompleteProps, args)), parseFromValuesOrFunc(columnDef.muiFilterAutocompleteProps, args));
    const datePickerProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterDatePickerProps, args)), parseFromValuesOrFunc(columnDef.muiFilterDatePickerProps, args));
    const dateTimePickerProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterDateTimePickerProps, args)), parseFromValuesOrFunc(columnDef.muiFilterDateTimePickerProps, args));
    const timePickerProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterTimePickerProps, args)), parseFromValuesOrFunc(columnDef.muiFilterTimePickerProps, args));
    const { allowedColumnFilterOptions, currentFilterOption, facetedUniqueValues, isAutocompleteFilter, isDateFilter, isMultiSelectFilter, isRangeFilter, isSelectFilter, } = getColumnFilterInfo({ header, table });
    const dropdownOptions = useDropdownOptions({ header, table });
    const filterChipLabel = ['empty', 'notEmpty'].includes(currentFilterOption)
        ? //@ts-ignore
            localization[`filter${((_c = (_b = currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.charAt) === null || _b === void 0 ? void 0 : _b.call(currentFilterOption, 0)) === null || _c === void 0 ? void 0 : _c.toUpperCase()) + (currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.slice(1))}`]
        : '';
    const filterPlaceholder = !isRangeFilter
        ? (_d = textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.placeholder) !== null && _d !== void 0 ? _d : (_f = localization.filterByColumn) === null || _f === void 0 ? void 0 : _f.replace('{column}', String(columnDef.header))
        : rangeFilterIndex === 0
            ? localization.min
            : rangeFilterIndex === 1
                ? localization.max
                : '';
    const showChangeModeButton = !!(enableColumnFilterModes &&
        columnDef.enableColumnFilterModes !== false &&
        !rangeFilterIndex &&
        (allowedColumnFilterOptions === undefined || !!(allowedColumnFilterOptions === null || allowedColumnFilterOptions === void 0 ? void 0 : allowedColumnFilterOptions.length)));
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterValue, setFilterValue] = useState(() => {
        var _a, _b;
        return isMultiSelectFilter
            ? column.getFilterValue() || []
            : isRangeFilter
                ? ((_a = column.getFilterValue()) === null || _a === void 0 ? void 0 : _a[rangeFilterIndex]) || ''
                : (_b = column.getFilterValue()) !== null && _b !== void 0 ? _b : '';
    });
    const [autocompleteValue, setAutocompleteValue] = useState(isAutocompleteFilter ? filterValue : null);
    const handleSetFilterValue = useCallback((newValue) => {
        if (isRangeFilter) {
            column.setFilterValue((old) => {
                const newFilterValues = old !== null && old !== void 0 ? old : ['', ''];
                newFilterValues[rangeFilterIndex] = newValue !== null && newValue !== void 0 ? newValue : undefined;
                return newFilterValues;
            });
        }
        else if (isMultiSelectFilter || isSelectFilter) {
            // Изменение состояний фильтров "select" и "multi-select" помечаем, как несрочное,
            // чтобы не было задержек при выборе элементов
            startTransition(() => {
                column.setFilterValue(newValue !== null && newValue !== void 0 ? newValue : undefined);
            });
        }
        else {
            column.setFilterValue(newValue !== null && newValue !== void 0 ? newValue : undefined);
        }
    }, []);
    const handleChange = (newValue) => {
        setFilterValue(newValue !== null && newValue !== void 0 ? newValue : '');
        handleSetFilterValue(newValue);
    };
    const handleTextFieldChange = (event) => {
        var _a;
        const newValue = textFieldProps.type === 'date'
            ? event.target.valueAsDate
            : textFieldProps.type === 'number'
                ? event.target.valueAsNumber
                : event.target.value;
        handleChange(newValue);
        (_a = textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.onChange) === null || _a === void 0 ? void 0 : _a.call(textFieldProps, event);
    };
    const handleAutocompleteChange = (newValue) => {
        setAutocompleteValue(newValue);
        handleChange(getValueAndLabel(newValue).value);
    };
    const handleClear = () => {
        if (isMultiSelectFilter) {
            setFilterValue([]);
            column.setFilterValue([]);
        }
        else if (isRangeFilter) {
            setFilterValue('');
            column.setFilterValue((old) => {
                const newFilterValues = (Array.isArray(old) && old) || ['', ''];
                newFilterValues[rangeFilterIndex] = undefined;
                return newFilterValues;
            });
        }
        else {
            setFilterValue('');
            column.setFilterValue(undefined);
        }
    };
    const handleClearEmptyFilterChip = () => {
        setFilterValue('');
        column.setFilterValue(undefined);
        setColumnFilterFns((prev) => {
            var _a;
            return (Object.assign(Object.assign({}, prev), { [header.id]: (_a = allowedColumnFilterOptions === null || allowedColumnFilterOptions === void 0 ? void 0 : allowedColumnFilterOptions[0]) !== null && _a !== void 0 ? _a : 'fuzzy' }));
        });
    };
    const handleFilterMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            const filterValue = column.getFilterValue();
            if (filterValue === undefined) {
                handleClear();
            }
            else if (isRangeFilter && rangeFilterIndex !== undefined) {
                setFilterValue(filterValue[rangeFilterIndex]);
            }
            else {
                setFilterValue(filterValue);
            }
        }
        isMounted.current = true;
    }, [column.getFilterValue()]);
    if (columnDef.Filter) {
        return jsx(Fragment, { children: (_g = columnDef.Filter) === null || _g === void 0 ? void 0 : _g.call(columnDef, { column, header, rangeFilterIndex, table }) });
    }
    const endAdornment = !isAutocompleteFilter && !isDateFilter && !filterChipLabel ? (jsx(InputAdornment, { position: "end", sx: { mr: isSelectFilter || isMultiSelectFilter ? '20px' : undefined }, children: jsx(Tooltip, { placement: "right", title: (_h = localization.clearFilter) !== null && _h !== void 0 ? _h : '', children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.clearFilter, disabled: !((_j = filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString()) === null || _j === void 0 ? void 0 : _j.length), onClick: handleClear, size: "small", sx: {
                        height: '2rem',
                        transform: 'scale(0.9)',
                        width: '2rem',
                    }, children: jsx(CloseIcon, {}) }) }) }) })) : null;
    const startAdornment = showChangeModeButton ? (jsxs(InputAdornment, { position: "start", children: [jsx(Tooltip, { title: localization.changeFilterMode, children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.changeFilterMode, onClick: handleFilterMenuOpen, size: "small", sx: { height: '1.75rem', width: '1.75rem' }, children: jsx(FilterListIcon, {}) }) }) }), filterChipLabel && jsx(Chip, { label: filterChipLabel, onDelete: handleClearEmptyFilterChip })] })) : null;
    const commonTextFieldProps = Object.assign(Object.assign({ FormHelperTextProps: {
            sx: {
                fontSize: '0.75rem',
                lineHeight: '0.8rem',
                whiteSpace: 'nowrap',
            },
        }, InputProps: endAdornment //hack because mui looks for presence of endAdornment key instead of undefined
            ? { endAdornment, startAdornment }
            : { startAdornment }, fullWidth: true, helperText: showChangeModeButton ? (jsx("label", { children: localization.filterMode.replace('{filterType}', 
            // @ts-ignore
            localization[`filter${((_k = currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.charAt(0)) === null || _k === void 0 ? void 0 : _k.toUpperCase()) + (currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.slice(1))}`]) })) : null, inputProps: {
            'aria-label': filterPlaceholder,
            autoComplete: 'new-password', // disable autocomplete and autofill
            disabled: !!filterChipLabel,
            sx: {
                textOverflow: 'ellipsis',
                width: filterChipLabel ? 0 : undefined,
            },
            title: filterPlaceholder,
        }, inputRef: (inputRef) => {
            filterInputRefs.current[`${column.id}-${rangeFilterIndex !== null && rangeFilterIndex !== void 0 ? rangeFilterIndex : 0}`] = inputRef;
            if (textFieldProps.inputRef) {
                textFieldProps.inputRef = inputRef;
            }
        }, margin: 'none', placeholder: filterChipLabel || isSelectFilter || isMultiSelectFilter ? undefined : filterPlaceholder, variant: 'standard' }, textFieldProps), { sx: (theme) => (Object.assign({ minWidth: isDateFilter
                ? '160px'
                : enableColumnFilterModes && rangeFilterIndex === 0
                    ? '110px'
                    : isRangeFilter
                        ? '100px'
                        : !filterChipLabel
                            ? '120px'
                            : 'auto', mx: '-2px', p: 0, width: 'calc(100% + 4px)' }, parseFromValuesOrFunc(textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.sx, theme))) });
    const commonDatePickerProps = {
        onChange: (newDate) => {
            handleChange(newDate);
        },
        value: filterValue || null,
    };
    return (jsxs(Fragment, { children: [(filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.startsWith('time')) ? (jsx(TimePicker, Object.assign({}, commonDatePickerProps, timePickerProps, { slotProps: {
                    field: Object.assign({ clearable: true, onClear: () => handleClear() }, (_l = timePickerProps === null || timePickerProps === void 0 ? void 0 : timePickerProps.slotProps) === null || _l === void 0 ? void 0 : _l.field),
                    textField: Object.assign(Object.assign({}, commonTextFieldProps), (_m = timePickerProps === null || timePickerProps === void 0 ? void 0 : timePickerProps.slotProps) === null || _m === void 0 ? void 0 : _m.textField),
                } }))) : (filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.startsWith('datetime')) ? (jsx(DateTimePicker, Object.assign({}, commonDatePickerProps, dateTimePickerProps, { slotProps: {
                    field: Object.assign({ clearable: true, onClear: () => handleClear() }, (_o = dateTimePickerProps === null || dateTimePickerProps === void 0 ? void 0 : dateTimePickerProps.slotProps) === null || _o === void 0 ? void 0 : _o.field),
                    textField: Object.assign(Object.assign({}, commonTextFieldProps), (_p = dateTimePickerProps === null || dateTimePickerProps === void 0 ? void 0 : dateTimePickerProps.slotProps) === null || _p === void 0 ? void 0 : _p.textField),
                } }))) : (filterVariant === null || filterVariant === void 0 ? void 0 : filterVariant.startsWith('date')) ? (jsx(DatePicker, Object.assign({}, commonDatePickerProps, datePickerProps, { slotProps: {
                    field: Object.assign({ clearable: true, onClear: () => handleClear() }, (_q = datePickerProps === null || datePickerProps === void 0 ? void 0 : datePickerProps.slotProps) === null || _q === void 0 ? void 0 : _q.field),
                    textField: Object.assign(Object.assign({}, commonTextFieldProps), (_r = datePickerProps === null || datePickerProps === void 0 ? void 0 : datePickerProps.slotProps) === null || _r === void 0 ? void 0 : _r.textField),
                } }))) : isAutocompleteFilter ? (jsx(Autocomplete, Object.assign({ freeSolo: true, getOptionLabel: (option) => getValueAndLabel(option).label, onChange: (_e, newValue) => handleAutocompleteChange(newValue), options: (_s = dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.map((option) => getValueAndLabel(option))) !== null && _s !== void 0 ? _s : [] }, autocompleteProps, { renderInput: (builtinTextFieldProps) => {
                    var _a;
                    return (jsx(TextField, Object.assign({}, builtinTextFieldProps, commonTextFieldProps, { InputProps: Object.assign(Object.assign({}, builtinTextFieldProps.InputProps), { startAdornment: (_a = commonTextFieldProps === null || commonTextFieldProps === void 0 ? void 0 : commonTextFieldProps.InputProps) === null || _a === void 0 ? void 0 : _a.startAdornment }), inputProps: Object.assign(Object.assign({}, builtinTextFieldProps.inputProps), commonTextFieldProps === null || commonTextFieldProps === void 0 ? void 0 : commonTextFieldProps.inputProps), onChange: handleTextFieldChange, onClick: (e) => e.stopPropagation() })));
                }, value: autocompleteValue }))) : (jsx(TextField, Object.assign({ select: isSelectFilter || isMultiSelectFilter }, commonTextFieldProps, { SelectProps: Object.assign({ MenuProps: { disableScrollLock: true }, displayEmpty: true, multiple: isMultiSelectFilter, renderValue: isMultiSelectFilter
                        ? (selected) => !(selected === null || selected === void 0 ? void 0 : selected.length) ? (jsx(Box, { sx: { opacity: 0.5 }, children: filterPlaceholder })) : (jsx(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: '2px' }, children: selected === null || selected === void 0 ? void 0 : selected.map((value) => {
                                const selectedValue = dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.find((option) => getValueAndLabel(option).value === value);
                                return jsx(Chip, { label: getValueAndLabel(selectedValue).label }, value);
                            }) }))
                        : undefined }, commonTextFieldProps.SelectProps), onChange: handleTextFieldChange, onClick: (e) => e.stopPropagation(), value: filterValue !== null && filterValue !== void 0 ? filterValue : '', children: (isSelectFilter || isMultiSelectFilter) && [
                    jsx(MenuItem, { disabled: true, divider: true, hidden: true, value: "", children: jsx(Box, { sx: { opacity: 0.5 }, children: filterPlaceholder }) }, "p"),
                    ...[
                        (_t = textFieldProps.children) !== null && _t !== void 0 ? _t : dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.map((option, index) => {
                            var _a;
                            const { label, value } = getValueAndLabel(option);
                            return (jsxs(MenuItem, { sx: {
                                    alignItems: 'center',
                                    display: 'flex',
                                    gap: '0.5rem',
                                    m: 0,
                                }, value: value, children: [isMultiSelectFilter && (jsx(Checkbox, { checked: ((_a = column.getFilterValue()) !== null && _a !== void 0 ? _a : []).includes(value), sx: { mr: '0.5rem' } })), label, ' ', !columnDef.filterSelectOptions && `(${facetedUniqueValues.get(value)})`] }, `${index}-${value}`));
                        }),
                    ],
                ] }))), jsx(MRT_FilterOptionMenu, { anchorEl: anchorEl, header: header, setAnchorEl: setAnchorEl, setFilterValue: setFilterValue, table: table })] }));
};

const MRT_FilterRangeFields = (_a) => {
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    return (jsx(Box, Object.assign({}, rest, { sx: (theme) => (Object.assign({ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: [0, 1].map((rangeFilterIndex) => (jsx(MRT_FilterTextField, { header: header, rangeFilterIndex: rangeFilterIndex, table: table }, rangeFilterIndex))) })));
};

const MRT_FilterRangeSlider = (_a) => {
    var _b, _c;
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    const { options: { enableColumnFilterModes, localization, muiFilterSliderProps }, refs: { filterInputRefs }, } = table;
    const { column } = header;
    const { columnDef } = column;
    const currentFilterOption = columnDef._filterFn;
    const showChangeModeButton = enableColumnFilterModes && columnDef.enableColumnFilterModes !== false;
    const sliderProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiFilterSliderProps, { column, table })), parseFromValuesOrFunc(columnDef.muiFilterSliderProps, { column, table })), rest);
    let [min, max] = sliderProps.min !== undefined && sliderProps.max !== undefined
        ? [sliderProps.min, sliderProps.max]
        : (_b = column.getFacetedMinMaxValues()) !== null && _b !== void 0 ? _b : [0, 1];
    //fix potential TanStack Table bugs where min or max is an array
    if (Array.isArray(min))
        min = min[0];
    if (Array.isArray(max))
        max = max[0];
    if (min === null)
        min = 0;
    if (max === null)
        max = 1;
    const [filterValues, setFilterValues] = useState([min, max]);
    const columnFilterValue = column.getFilterValue();
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            if (columnFilterValue === undefined) {
                setFilterValues([min, max]);
            }
            else if (Array.isArray(columnFilterValue)) {
                setFilterValues(columnFilterValue);
            }
        }
        isMounted.current = true;
    }, [columnFilterValue, min, max]);
    return (jsxs(Stack, { children: [jsx(Slider, Object.assign({ disableSwap: true, max: max, min: min, onChange: (_event, values) => {
                    setFilterValues(values);
                }, onChangeCommitted: (_event, value) => {
                    if (Array.isArray(value)) {
                        if (value[0] <= min && value[1] >= max) {
                            //if the user has selected the entire range, remove the filter
                            column.setFilterValue(undefined);
                        }
                        else {
                            column.setFilterValue(value);
                        }
                    }
                }, value: filterValues, valueLabelDisplay: "auto" }, sliderProps, { slotProps: {
                    input: {
                        ref: (node) => {
                            var _a, _b;
                            if (node) {
                                filterInputRefs.current[`${column.id}-0`] = node;
                                // @ts-ignore
                                if ((_b = (_a = sliderProps === null || sliderProps === void 0 ? void 0 : sliderProps.slotProps) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.ref) {
                                    //@ts-ignore
                                    sliderProps.slotProps.input.ref = node;
                                }
                            }
                        },
                    },
                }, sx: (theme) => (Object.assign({ m: 'auto', minWidth: `${column.getSize() - 50}px`, mt: !showChangeModeButton ? '10px' : '6px', px: '4px', width: 'calc(100% - 8px)' }, parseFromValuesOrFunc(sliderProps === null || sliderProps === void 0 ? void 0 : sliderProps.sx, theme))) })), showChangeModeButton ? (jsx(FormHelperText, { sx: {
                    fontSize: '0.75rem',
                    lineHeight: '0.8rem',
                    m: '-3px -6px',
                    whiteSpace: 'nowrap',
                }, children: localization.filterMode.replace('{filterType}', 
                // @ts-ignore
                localization[`filter${((_c = currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.charAt(0)) === null || _c === void 0 ? void 0 : _c.toUpperCase()) +
                    (currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.slice(1))}`]) })) : null] }));
};

const MRT_TableHeadCellFilterContainer = (_a) => {
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    const { getState, options: { columnFilterDisplayMode }, } = table;
    const { showColumnFilters } = getState();
    const { column } = header;
    const { columnDef } = column;
    const { isRangeFilter } = getColumnFilterInfo({ header, table });
    return (jsx(Collapse, Object.assign({ in: showColumnFilters || columnFilterDisplayMode === 'popover', mountOnEnter: true, unmountOnExit: true }, rest, { children: columnDef.filterVariant === 'checkbox' ? (jsx(MRT_FilterCheckbox, { column: column, table: table })) : columnDef.filterVariant === 'range-slider' ? (jsx(MRT_FilterRangeSlider, { header: header, table: table })) : isRangeFilter ? (jsx(MRT_FilterRangeFields, { header: header, table: table })) : (jsx(MRT_FilterTextField, { header: header, table: table })) })));
};

const MRT_TableHeadCellFilterLabel = (_a) => {
    var _b, _c;
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    const { options: { columnFilterDisplayMode, icons: { FilterAltIcon }, localization, }, refs: { filterInputRefs }, setShowColumnFilters, } = table;
    const { column } = header;
    const { columnDef } = column;
    const filterValue = column.getFilterValue();
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentFilterOption, isMultiSelectFilter, isRangeFilter, isSelectFilter, } = getColumnFilterInfo({ header, table });
    const dropdownOptions = useDropdownOptions({ header, table });
    const getSelectLabel = (index) => getValueAndLabel(dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.find((option) => getValueAndLabel(option).value ===
        (index !== undefined ? filterValue[index] : filterValue))).label;
    const isFilterActive = (Array.isArray(filterValue) && filterValue.some(Boolean)) ||
        (!!filterValue && !Array.isArray(filterValue));
    const filterTooltip = columnFilterDisplayMode === 'popover' && !isFilterActive
        ? (_b = localization.filterByColumn) === null || _b === void 0 ? void 0 : _b.replace('{column}', String(columnDef.header))
        : localization.filteringByColumn
            .replace('{column}', String(columnDef.header))
            .replace('{filterType}', currentFilterOption
            ? // @ts-ignore
                localization[`filter${((_c = currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.charAt(0)) === null || _c === void 0 ? void 0 : _c.toUpperCase()) +
                    (currentFilterOption === null || currentFilterOption === void 0 ? void 0 : currentFilterOption.slice(1))}`]
            : '')
            .replace('{filterValue}', `"${Array.isArray(filterValue)
            ? filterValue
                .map((value, index) => isMultiSelectFilter ? getSelectLabel(index) : value)
                .join(`" ${isRangeFilter ? localization.and : localization.or} "`)
            : isSelectFilter
                ? getSelectLabel()
                : filterValue}"`)
            .replace('" "', '');
    return (jsxs(Fragment, { children: [jsx(Grow, { in: columnFilterDisplayMode === 'popover' ||
                    (!!filterValue && !isRangeFilter) ||
                    (isRangeFilter && // @ts-ignore
                        (!!(filterValue === null || filterValue === void 0 ? void 0 : filterValue[0]) || !!(filterValue === null || filterValue === void 0 ? void 0 : filterValue[1]))), unmountOnExit: true, children: jsx(Box, { component: "span", sx: { flex: '0 0' }, children: jsx(Tooltip, { placement: "top", title: filterTooltip, children: jsx(IconButton, Object.assign({ disableRipple: true, onClick: (event) => {
                                if (columnFilterDisplayMode === 'popover') {
                                    setAnchorEl(event.currentTarget);
                                }
                                else {
                                    setShowColumnFilters(true);
                                }
                                queueMicrotask(() => {
                                    var _a, _b, _c, _d;
                                    (_b = (_a = filterInputRefs.current[`${column.id}-0`]) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
                                    (_d = (_c = filterInputRefs.current[`${column.id}-0`]) === null || _c === void 0 ? void 0 : _c.select) === null || _d === void 0 ? void 0 : _d.call(_c);
                                });
                                event.stopPropagation();
                            }, size: "small" }, rest, { sx: (theme) => (Object.assign({ height: '16px', ml: '4px', opacity: isFilterActive ? 1 : 0.3, p: '8px', transform: 'scale(0.75)', transition: 'all 150ms ease-in-out', width: '16px' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: jsx(FilterAltIcon, {}) })) }) }) }), columnFilterDisplayMode === 'popover' && (jsx(Popover, { anchorEl: anchorEl, anchorOrigin: {
                    horizontal: 'center',
                    vertical: 'top',
                }, disableScrollLock: true, onClick: (event) => event.stopPropagation(), onClose: (event) => {
                    //@ts-ignore
                    event.stopPropagation();
                    setAnchorEl(null);
                }, onKeyDown: (event) => event.key === 'Enter' && setAnchorEl(null), open: !!anchorEl, slotProps: { paper: { sx: { overflow: 'visible' } } }, transformOrigin: {
                    horizontal: 'center',
                    vertical: 'bottom',
                }, children: jsx(Box, { sx: { p: '1rem' }, children: jsx(MRT_TableHeadCellFilterContainer, { header: header, table: table }) }) }))] }));
};

const MRT_TableHeadCellGrabHandle = (_a) => {
    var { column, table, tableHeadCellRef } = _a, rest = __rest(_a, ["column", "table", "tableHeadCellRef"]);
    const { getState, options: { enableColumnOrdering, muiColumnDragHandleProps }, setColumnOrder, setDraggingColumn, setHoveredColumn, } = table;
    const { columnDef } = column;
    const { columnOrder, draggingColumn, hoveredColumn } = getState();
    const iconButtonProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiColumnDragHandleProps, { column, table })), parseFromValuesOrFunc(columnDef.muiColumnDragHandleProps, {
        column,
        table,
    })), rest);
    const handleDragStart = (event) => {
        var _a;
        (_a = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.onDragStart) === null || _a === void 0 ? void 0 : _a.call(iconButtonProps, event);
        setDraggingColumn(column);
        try {
            event.dataTransfer.setDragImage(tableHeadCellRef.current, 0, 0);
        }
        catch (e) {
            console.error(e);
        }
    };
    const handleDragEnd = (event) => {
        var _a;
        (_a = iconButtonProps === null || iconButtonProps === void 0 ? void 0 : iconButtonProps.onDragEnd) === null || _a === void 0 ? void 0 : _a.call(iconButtonProps, event);
        if ((hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === 'drop-zone') {
            column.toggleGrouping();
        }
        else if (enableColumnOrdering &&
            hoveredColumn &&
            (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) !== (draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id)) {
            setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
        }
        setDraggingColumn(null);
        setHoveredColumn(null);
    };
    return (jsx(MRT_GrabHandleButton, Object.assign({}, iconButtonProps, { onDragEnd: handleDragEnd, onDragStart: handleDragStart, table: table })));
};

const MRT_TableHeadCellResizeHandle = (_a) => {
    var _b;
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    const { getState, options: { columnResizeDirection, columnResizeMode }, setColumnSizingInfo, } = table;
    const { density } = getState();
    const { column } = header;
    const handler = header.getResizeHandler();
    const mx = density === 'compact'
        ? '-8px'
        : density === 'comfortable'
            ? '-16px'
            : '-24px';
    const lr = column.columnDef.columnDefType === 'display' ? '4px' : '0';
    return (jsx(Box, { className: "Mui-TableHeadCell-ResizeHandle-Wrapper", onDoubleClick: () => {
            setColumnSizingInfo((old) => (Object.assign(Object.assign({}, old), { isResizingColumn: false })));
            column.resetSize();
        }, onMouseDown: handler, onTouchStart: handler, style: {
            transform: column.getIsResizing() && columnResizeMode === 'onEnd'
                ? `translateX(${(columnResizeDirection === 'rtl' ? -1 : 1) *
                    ((_b = getState().columnSizingInfo.deltaOffset) !== null && _b !== void 0 ? _b : 0)}px)`
                : undefined,
        }, sx: (theme) => ({
            '&:active > hr': {
                backgroundColor: theme.palette.info.main,
                opacity: header.subHeaders.length || columnResizeMode === 'onEnd' ? 1 : 0,
            },
            cursor: 'col-resize',
            left: columnResizeDirection === 'rtl' ? lr : undefined,
            ml: columnResizeDirection === 'rtl' ? mx : undefined,
            mr: columnResizeDirection === 'ltr' ? mx : undefined,
            position: 'absolute',
            px: '4px',
            right: columnResizeDirection === 'ltr' ? lr : undefined,
        }), children: jsx(Divider, { className: "Mui-TableHeadCell-ResizeHandle-Divider", flexItem: true, orientation: "vertical", sx: (theme) => (Object.assign({ borderRadius: '2px', borderWidth: '2px', height: '24px', touchAction: 'none', transform: 'translateX(4px)', transition: column.getIsResizing()
                    ? undefined
                    : 'all 150ms ease-in-out', userSelect: 'none', zIndex: 4 }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))) }) }));
};

const MRT_TableHeadCellSortLabel = (_a) => {
    var { header, table } = _a, rest = __rest(_a, ["header", "table"]);
    const { getState, options: { icons: { ArrowDownwardIcon, SyncAltIcon }, localization, }, } = table;
    const { column } = header;
    const { columnDef } = column;
    const { isLoading, showSkeletons, sorting } = getState();
    const isSorted = !!column.getIsSorted();
    const sortTooltip = isLoading || showSkeletons
        ? ''
        : column.getIsSorted()
            ? column.getIsSorted() === 'desc'
                ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
                : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
            : column.getNextSortingOrder() === 'desc'
                ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
                : localization.sortByColumnAsc.replace('{column}', columnDef.header);
    const direction = isSorted
        ? column.getIsSorted()
        : undefined;
    return (jsx(Tooltip, { placement: "top", title: sortTooltip, children: jsx(Badge, { badgeContent: sorting.length > 1 ? column.getSortIndex() + 1 : 0, overlap: "circular", children: jsx(TableSortLabel, Object.assign({ IconComponent: !isSorted
                    ? (props) => (jsx(SyncAltIcon, Object.assign({}, props, { direction: direction, style: {
                            transform: 'rotate(-90deg) scaleX(0.9) translateX(-1px)',
                        } })))
                    : ArrowDownwardIcon, active: true, "aria-label": sortTooltip, direction: direction, onClick: (e) => {
                    var _a;
                    e.stopPropagation();
                    (_a = header.column.getToggleSortingHandler()) === null || _a === void 0 ? void 0 : _a(e);
                } }, rest, { sx: (theme) => (Object.assign({ '.MuiTableSortLabel-icon': {
                        color: `${theme.palette.mode === 'dark'
                            ? theme.palette.text.primary
                            : theme.palette.text.secondary} !important`,
                    }, flex: '0 0', opacity: isSorted ? 1 : 0.3, transition: 'all 150ms ease-in-out', width: '3ch' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))) })) }) }));
};

const MRT_TableHeadCell = (_a) => {
    var _b, _c, _d, _f, _g, _h;
    var { columnVirtualizer, header, staticColumnIndex, table } = _a, rest = __rest(_a, ["columnVirtualizer", "header", "staticColumnIndex", "table"]);
    const theme = useTheme();
    const { getState, options: { columnFilterDisplayMode, columnResizeDirection, columnResizeMode, enableColumnActions, enableColumnDragging, enableColumnOrdering, enableColumnPinning, enableGrouping, enableMultiSort, layoutMode, mrtTheme: { draggingBorderColor }, muiTableHeadCellProps, }, refs: { tableHeadCellRefs }, setHoveredColumn, } = table;
    const { columnSizingInfo, density, draggingColumn, grouping, hoveredColumn, showColumnFilters, } = getState();
    const { column } = header;
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const tableCellProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableHeadCellProps, { column, table })), parseFromValuesOrFunc(columnDef.muiTableHeadCellProps, {
        column,
        table,
    })), rest);
    const isColumnPinned = enableColumnPinning &&
        columnDef.columnDefType !== 'group' &&
        column.getIsPinned();
    const showColumnActions = (enableColumnActions || columnDef.enableColumnActions) &&
        columnDef.enableColumnActions !== false;
    const showDragHandle = enableColumnDragging !== false &&
        columnDef.enableColumnDragging !== false &&
        (enableColumnDragging ||
            (enableColumnOrdering && columnDef.enableColumnOrdering !== false) ||
            (enableGrouping &&
                columnDef.enableGrouping !== false &&
                !grouping.includes(column.id)));
    const headerPL = useMemo(() => {
        let pl = 0;
        if (column.getCanSort())
            pl += 1;
        if (showColumnActions)
            pl += 1.75;
        if (showDragHandle)
            pl += 1.5;
        return pl;
    }, [showColumnActions, showDragHandle]);
    const draggingBorders = useMemo(() => {
        const showResizeBorder = columnSizingInfo.isResizingColumn === column.id &&
            columnResizeMode === 'onChange' &&
            !header.subHeaders.length;
        const borderStyle = showResizeBorder
            ? `2px solid ${draggingBorderColor} !important`
            : (draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.id) === column.id
                ? `1px dashed ${theme.palette.grey[500]}`
                : (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === column.id
                    ? `2px dashed ${draggingBorderColor}`
                    : undefined;
        if (showResizeBorder) {
            return columnResizeDirection === 'ltr'
                ? { borderRight: borderStyle }
                : { borderLeft: borderStyle };
        }
        const draggingBorders = borderStyle
            ? {
                borderLeft: borderStyle,
                borderRight: borderStyle,
                borderTop: borderStyle,
            }
            : undefined;
        return draggingBorders;
    }, [draggingColumn, hoveredColumn, columnSizingInfo.isResizingColumn]);
    const handleDragEnter = (_e) => {
        if (enableGrouping && (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === 'drop-zone') {
            setHoveredColumn(null);
        }
        if (enableColumnOrdering && draggingColumn && columnDefType !== 'group') {
            setHoveredColumn(columnDef.enableColumnOrdering !== false ? column : null);
        }
    };
    const handleDragOver = (e) => {
        if (columnDef.enableColumnOrdering !== false) {
            e.preventDefault();
        }
    };
    const HeaderElement = (_b = parseFromValuesOrFunc(columnDef.Header, {
        column,
        header,
        table,
    })) !== null && _b !== void 0 ? _b : columnDef.header;
    return (jsxs(TableCell, Object.assign({ align: columnDefType === 'group'
            ? 'center'
            : theme.direction === 'rtl'
                ? 'right'
                : 'left', colSpan: header.colSpan, "data-index": staticColumnIndex, "data-pinned": !!isColumnPinned || undefined, onDragEnter: handleDragEnter, onDragOver: handleDragOver, ref: (node) => {
            var _a;
            if (node) {
                tableHeadCellRefs.current[column.id] = node;
                if (columnDefType !== 'group') {
                    (_a = columnVirtualizer === null || columnVirtualizer === void 0 ? void 0 : columnVirtualizer.measureElement) === null || _a === void 0 ? void 0 : _a.call(columnVirtualizer, node);
                }
            }
        } }, tableCellProps, { sx: (theme) => (Object.assign(Object.assign({ '& :hover': {
                '.MuiButtonBase-root': {
                    opacity: 1,
                },
            }, flexDirection: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'column' : undefined, fontWeight: 'bold', overflow: 'visible', p: density === 'compact'
                ? '0.5rem'
                : density === 'comfortable'
                    ? columnDefType === 'display'
                        ? '0.75rem'
                        : '1rem'
                    : columnDefType === 'display'
                        ? '1rem 1.25rem'
                        : '1.5rem', pb: columnDefType === 'display'
                ? 0
                : showColumnFilters || density === 'compact'
                    ? '0.4rem'
                    : '0.6rem', pt: columnDefType === 'group' || density === 'compact'
                ? '0.25rem'
                : density === 'comfortable'
                    ? '.75rem'
                    : '1.25rem', userSelect: enableMultiSort && column.getCanSort() ? 'none' : undefined, verticalAlign: 'top' }, getCommonMRTCellStyles({
            column,
            header,
            table,
            tableCellProps,
            theme,
        })), draggingBorders)), children: [header.isPlaceholder
                ? null
                : (_c = tableCellProps.children) !== null && _c !== void 0 ? _c : (jsxs(Box, { className: "Mui-TableHeadCell-Content", sx: {
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: (tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.align) === 'right' ? 'row-reverse' : 'row',
                        justifyContent: columnDefType === 'group' ||
                            (tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.align) === 'center'
                            ? 'center'
                            : column.getCanResize()
                                ? 'space-between'
                                : 'flex-start',
                        position: 'relative',
                        width: '100%',
                    }, children: [jsxs(Box, { className: "Mui-TableHeadCell-Content-Labels", onClick: column.getToggleSortingHandler(), sx: {
                                alignItems: 'center',
                                cursor: column.getCanSort() && columnDefType !== 'group'
                                    ? 'pointer'
                                    : undefined,
                                display: 'flex',
                                flexDirection: (tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.align) === 'right' ? 'row-reverse' : 'row',
                                overflow: columnDefType === 'data' ? 'hidden' : undefined,
                                pl: (tableCellProps === null || tableCellProps === void 0 ? void 0 : tableCellProps.align) === 'center'
                                    ? `${headerPL}rem`
                                    : undefined,
                            }, children: [jsx(Box, { className: "Mui-TableHeadCell-Content-Wrapper", sx: {
                                        '&:hover': {
                                            textOverflow: 'clip',
                                        },
                                        minWidth: `${Math.min((_f = (_d = columnDef.header) === null || _d === void 0 ? void 0 : _d.length) !== null && _f !== void 0 ? _f : 0, 4)}ch`,
                                        overflow: columnDefType === 'data' ? 'hidden' : undefined,
                                        textOverflow: 'ellipsis',
                                        whiteSpace: ((_h = (_g = columnDef.header) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) < 20
                                            ? 'nowrap'
                                            : 'normal',
                                    }, children: HeaderElement }), column.getCanFilter() && (jsx(MRT_TableHeadCellFilterLabel, { header: header, table: table })), column.getCanSort() && (jsx(MRT_TableHeadCellSortLabel, { header: header, table: table }))] }), columnDefType !== 'group' && (jsxs(Box, { className: "Mui-TableHeadCell-Content-Actions", sx: {
                                whiteSpace: 'nowrap',
                            }, children: [showDragHandle && (jsx(MRT_TableHeadCellGrabHandle, { column: column, table: table, tableHeadCellRef: {
                                        current: tableHeadCellRefs.current[column.id],
                                    } })), showColumnActions && (jsx(MRT_TableHeadCellColumnActionsButton, { header: header, table: table }))] })), column.getCanResize() && (jsx(MRT_TableHeadCellResizeHandle, { header: header, table: table }))] })), columnFilterDisplayMode === 'subheader' && column.getCanFilter() && (jsx(MRT_TableHeadCellFilterContainer, { header: header, table: table }))] })));
};

const MRT_TableHeadRow = (_a) => {
    var { columnVirtualizer, headerGroup, table } = _a, rest = __rest(_a, ["columnVirtualizer", "headerGroup", "table"]);
    const { options: { enableStickyHeader, layoutMode, mrtTheme: { baseBackgroundColor }, muiTableHeadRowProps, }, } = table;
    const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } = columnVirtualizer !== null && columnVirtualizer !== void 0 ? columnVirtualizer : {};
    const tableRowProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableHeadRowProps, {
        headerGroup,
        table,
    })), rest);
    return (jsxs(TableRow, Object.assign({}, tableRowProps, { sx: (theme) => (Object.assign({ backgroundColor: baseBackgroundColor, boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`, display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'flex' : undefined, position: enableStickyHeader && layoutMode === 'semantic'
                ? 'sticky'
                : 'relative', top: 0 }, parseFromValuesOrFunc(tableRowProps === null || tableRowProps === void 0 ? void 0 : tableRowProps.sx, theme))), children: [virtualPaddingLeft ? (jsx("th", { style: { display: 'flex', width: virtualPaddingLeft } })) : null, (virtualColumns !== null && virtualColumns !== void 0 ? virtualColumns : headerGroup.headers).map((headerOrVirtualHeader, staticColumnIndex) => {
                let header = headerOrVirtualHeader;
                if (columnVirtualizer) {
                    staticColumnIndex = headerOrVirtualHeader
                        .index;
                    header = headerGroup.headers[staticColumnIndex];
                }
                return header ? (jsx(MRT_TableHeadCell, { columnVirtualizer: columnVirtualizer, header: header, staticColumnIndex: staticColumnIndex, table: table }, header.id)) : null;
            }), virtualPaddingRight ? (jsx("th", { style: { display: 'flex', width: virtualPaddingRight } })) : null] })));
};

const MRT_ToolbarAlertBanner = (_a) => {
    var _b, _c, _d;
    var { stackAlertBanner, table } = _a, rest = __rest(_a, ["stackAlertBanner", "table"]);
    const { getFilteredSelectedRowModel, getPrePaginationRowModel, getState, options: { enableRowSelection, enableSelectAll, localization, manualPagination, muiToolbarAlertBannerChipProps, muiToolbarAlertBannerProps, positionToolbarAlertBanner, renderToolbarAlertBannerContent, rowCount, }, refs: { tablePaperRef }, } = table;
    const { density, grouping, rowSelection, showAlertBanner } = getState();
    const alertProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiToolbarAlertBannerProps, {
        table,
    })), rest);
    const chipProps = parseFromValuesOrFunc(muiToolbarAlertBannerChipProps, {
        table,
    });
    const totalRowCount = rowCount !== null && rowCount !== void 0 ? rowCount : getPrePaginationRowModel().flatRows.length;
    const selectedRowCount = useMemo(() => manualPagination
        ? Object.values(rowSelection).filter(Boolean).length
        : getFilteredSelectedRowModel().rows.length, [rowSelection, totalRowCount, manualPagination]);
    const selectedAlert = selectedRowCount > 0 ? (jsxs(Stack, { alignItems: "center", direction: "row", gap: "16px", children: [(_c = (_b = localization.selectedCountOfRowCountRowsSelected) === null || _b === void 0 ? void 0 : _b.replace('{selectedCount}', selectedRowCount.toLocaleString())) === null || _c === void 0 ? void 0 : _c.replace('{rowCount}', totalRowCount.toString()), jsx(Button, { onClick: (event) => getMRT_SelectAllHandler({ table })(event, false, true), size: "small", sx: { p: '2px' }, children: localization.clearSelection })] })) : null;
    const groupedAlert = grouping.length > 0 ? (jsxs("span", { children: [localization.groupedBy, ' ', grouping.map((columnId, index) => (jsxs(Fragment$1, { children: [index > 0 ? localization.thenBy : '', jsx(Chip, Object.assign({ label: table.getColumn(columnId).columnDef.header, onDelete: () => table.getColumn(columnId).toggleGrouping() }, chipProps))] }, `${index}-${columnId}`)))] })) : null;
    return (jsx(Collapse, { in: showAlertBanner || !!selectedAlert || !!groupedAlert, timeout: stackAlertBanner ? 200 : 0, children: jsx(Alert, Object.assign({ color: "info", icon: false }, alertProps, { sx: (theme) => {
                var _a, _b;
                return (Object.assign({ '& .MuiAlert-message': {
                        maxWidth: `calc(${(_b = (_a = tablePaperRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 360}px - 1rem)`,
                        width: '100%',
                    }, borderRadius: 0, fontSize: '1rem', left: 0, mb: stackAlertBanner
                        ? 0
                        : positionToolbarAlertBanner === 'bottom'
                            ? '-1rem'
                            : undefined, p: 0, position: 'relative', right: 0, top: 0, width: '100%', zIndex: 2 }, parseFromValuesOrFunc(alertProps === null || alertProps === void 0 ? void 0 : alertProps.sx, theme)));
            }, children: (_d = renderToolbarAlertBannerContent === null || renderToolbarAlertBannerContent === void 0 ? void 0 : renderToolbarAlertBannerContent({
                groupedAlert,
                selectedAlert,
                table,
            })) !== null && _d !== void 0 ? _d : (jsxs(Fragment, { children: [(alertProps === null || alertProps === void 0 ? void 0 : alertProps.title) && jsx(AlertTitle, { children: alertProps.title }), jsxs(Stack, { sx: {
                            p: positionToolbarAlertBanner !== 'head-overlay'
                                ? '0.5rem 1rem'
                                : density === 'spacious'
                                    ? '0.75rem 1.25rem'
                                    : density === 'comfortable'
                                        ? '0.5rem 0.75rem'
                                        : '0.25rem 0.5rem',
                        }, children: [alertProps === null || alertProps === void 0 ? void 0 : alertProps.children, (alertProps === null || alertProps === void 0 ? void 0 : alertProps.children) && (selectedAlert || groupedAlert) && (jsx("br", {})), jsxs(Box, { sx: { display: 'flex' }, children: [enableRowSelection &&
                                        enableSelectAll &&
                                        positionToolbarAlertBanner === 'head-overlay' && (jsx(MRT_SelectCheckbox, { table: table })), ' ', selectedAlert] }), selectedAlert && groupedAlert && jsx("br", {}), groupedAlert] })] })) })) }));
};

const MRT_TableHead = (_a) => {
    var { columnVirtualizer, table } = _a, rest = __rest(_a, ["columnVirtualizer", "table"]);
    const { getState, options: { enableStickyHeader, layoutMode, muiTableHeadProps, positionToolbarAlertBanner, }, refs: { tableHeadRef }, } = table;
    const { isFullScreen, showAlertBanner } = getState();
    const tableHeadProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableHeadProps, { table })), rest);
    const stickyHeader = enableStickyHeader || isFullScreen;
    return (jsx(TableHead, Object.assign({}, tableHeadProps, { ref: (ref) => {
            tableHeadRef.current = ref;
            if (tableHeadProps === null || tableHeadProps === void 0 ? void 0 : tableHeadProps.ref) {
                // @ts-ignore
                tableHeadProps.ref.current = ref;
            }
        }, sx: (theme) => (Object.assign({ display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined, opacity: 0.97, position: stickyHeader ? 'sticky' : 'relative', top: stickyHeader && (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 0 : undefined, zIndex: stickyHeader ? 2 : undefined }, parseFromValuesOrFunc(tableHeadProps === null || tableHeadProps === void 0 ? void 0 : tableHeadProps.sx, theme))), children: positionToolbarAlertBanner === 'head-overlay' &&
            (showAlertBanner || table.getSelectedRowModel().rows.length > 0) ? (jsx("tr", { style: {
                display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined,
            }, children: jsx("th", { colSpan: table.getVisibleLeafColumns().length, style: {
                    display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined,
                    padding: 0,
                }, children: jsx(MRT_ToolbarAlertBanner, { table: table }) }) })) : (table
            .getHeaderGroups()
            .map((headerGroup) => (jsx(MRT_TableHeadRow, { columnVirtualizer: columnVirtualizer, headerGroup: headerGroup, table: table }, headerGroup.id)))) })));
};

const MRT_Table = (_a) => {
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getFlatHeaders, getState, options: { columns, enableStickyHeader, enableTableFooter, enableTableHead, layoutMode, memoMode, muiTableProps, renderCaption, }, } = table;
    const { columnSizing, columnSizingInfo, columnVisibility, isFullScreen } = getState();
    const tableProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableProps, { table })), rest);
    const Caption = parseFromValuesOrFunc(renderCaption, { table });
    const columnSizeVars = useMemo(() => {
        const headers = getFlatHeaders();
        const colSizes = {};
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const colSize = header.getSize();
            colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
            colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
        }
        return colSizes;
    }, [columns, columnSizing, columnSizingInfo, columnVisibility]);
    const columnVirtualizer = useMRT_ColumnVirtualizer(table);
    const commonTableGroupProps = {
        columnVirtualizer,
        table,
    };
    return (jsxs(Table, Object.assign({ stickyHeader: enableStickyHeader || isFullScreen }, tableProps, { style: Object.assign(Object.assign({}, columnSizeVars), tableProps === null || tableProps === void 0 ? void 0 : tableProps.style), sx: (theme) => (Object.assign({ borderCollapse: 'separate', display: (layoutMode === null || layoutMode === void 0 ? void 0 : layoutMode.startsWith('grid')) ? 'grid' : undefined, position: 'relative' }, parseFromValuesOrFunc(tableProps === null || tableProps === void 0 ? void 0 : tableProps.sx, theme))), children: [!!Caption && jsx("caption", { children: Caption }), enableTableHead && jsx(MRT_TableHead, Object.assign({}, commonTableGroupProps)), memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (jsx(Memo_MRT_TableBody, Object.assign({}, commonTableGroupProps))) : (jsx(MRT_TableBody, Object.assign({}, commonTableGroupProps))), enableTableFooter && jsx(MRT_TableFooter, Object.assign({}, commonTableGroupProps))] })));
};

const MRT_TableLoadingOverlay = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { options: { localization, mrtTheme: { baseBackgroundColor }, muiCircularProgressProps, }, } = table;
    const circularProgressProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiCircularProgressProps, { table })), rest);
    return (jsx(Box, { sx: {
            alignItems: 'center',
            backgroundColor: alpha(baseBackgroundColor, 0.5),
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            left: 0,
            maxHeight: '100vh',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
            zIndex: 3,
        }, children: (_b = circularProgressProps === null || circularProgressProps === void 0 ? void 0 : circularProgressProps.Component) !== null && _b !== void 0 ? _b : (jsx(CircularProgress, Object.assign({ "aria-label": localization.noRecordsToDisplay, id: "mrt-progress" }, circularProgressProps))) }));
};

const MRT_CellActionMenu = (_a) => {
    var _b, _c;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { editDisplayMode, enableClickToCopy, enableEditing, icons: { ContentCopy, EditIcon }, localization, mrtTheme: { menuBackgroundColor }, renderCellActionMenuItems, }, refs: { actionCellRef }, } = table;
    const { actionCell, density } = getState();
    const cell = actionCell;
    const { row } = cell;
    const { column } = cell;
    const { columnDef } = column;
    const handleClose = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        table.setActionCell(null);
        actionCellRef.current = null;
    };
    const internalMenuItems = [
        (parseFromValuesOrFunc(enableClickToCopy, cell) === 'context-menu' ||
            parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) ===
                'context-menu') && (jsx(MRT_ActionMenuItem, { icon: jsx(ContentCopy, {}), label: localization.copy, onClick: (event) => {
                event.stopPropagation();
                navigator.clipboard.writeText(cell.getValue());
                handleClose();
            }, table: table }, 'mrt-copy')),
        parseFromValuesOrFunc(enableEditing, row) && editDisplayMode === 'cell' && (jsx(MRT_ActionMenuItem, { icon: jsx(EditIcon, {}), label: localization.edit, onClick: () => {
                openEditingCell({ cell, table });
                handleClose();
            }, table: table }, 'mrt-edit')),
    ].filter(Boolean);
    const renderActionProps = {
        cell,
        closeMenu: handleClose,
        column,
        internalMenuItems,
        row,
        table,
    };
    const menuItems = (_c = (_b = columnDef.renderCellActionMenuItems) === null || _b === void 0 ? void 0 : _b.call(columnDef, renderActionProps)) !== null && _c !== void 0 ? _c : renderCellActionMenuItems === null || renderCellActionMenuItems === void 0 ? void 0 : renderCellActionMenuItems(renderActionProps);
    return ((!!(menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) || !!(internalMenuItems === null || internalMenuItems === void 0 ? void 0 : internalMenuItems.length)) && (jsx(Menu, Object.assign({ MenuListProps: {
            dense: density === 'compact',
            sx: {
                backgroundColor: menuBackgroundColor,
            },
        }, anchorEl: actionCellRef.current, disableScrollLock: true, onClick: (event) => event.stopPropagation(), onClose: handleClose, open: !!cell, transformOrigin: { horizontal: -100, vertical: 8 } }, rest, { children: menuItems !== null && menuItems !== void 0 ? menuItems : internalMenuItems }))));
};

const MRT_EditRowModal = (_a) => {
    var _b;
    var { open, table } = _a, rest = __rest(_a, ["open", "table"]);
    const { getState, options: { localization, muiCreateRowModalProps, muiEditRowDialogProps, onCreatingRowCancel, onEditingRowCancel, renderCreateRowDialogContent, renderEditRowDialogContent, }, setCreatingRow, setEditingRow, } = table;
    const { creatingRow, editingRow } = getState();
    const row = (creatingRow !== null && creatingRow !== void 0 ? creatingRow : editingRow);
    const dialogProps = Object.assign(Object.assign(Object.assign({}, parseFromValuesOrFunc(muiEditRowDialogProps, { row, table })), (creatingRow &&
        parseFromValuesOrFunc(muiCreateRowModalProps, { row, table }))), rest);
    const internalEditComponents = row
        .getAllCells()
        .filter((cell) => cell.column.columnDef.columnDefType === 'data')
        .map((cell) => (jsx(MRT_EditCellTextField, { cell: cell, table: table }, cell.id)));
    return (jsx(Dialog, Object.assign({ fullWidth: true, maxWidth: "xs", onClose: (event, reason) => {
            var _a;
            if (creatingRow) {
                onCreatingRowCancel === null || onCreatingRowCancel === void 0 ? void 0 : onCreatingRowCancel({ row, table });
                setCreatingRow(null);
            }
            else {
                onEditingRowCancel === null || onEditingRowCancel === void 0 ? void 0 : onEditingRowCancel({ row, table });
                setEditingRow(null);
            }
            row._valuesCache = {}; //reset values cache
            (_a = dialogProps.onClose) === null || _a === void 0 ? void 0 : _a.call(dialogProps, event, reason);
        }, open: open }, dialogProps, { children: (_b = ((creatingRow &&
            (renderCreateRowDialogContent === null || renderCreateRowDialogContent === void 0 ? void 0 : renderCreateRowDialogContent({
                internalEditComponents,
                row,
                table,
            }))) ||
            (renderEditRowDialogContent === null || renderEditRowDialogContent === void 0 ? void 0 : renderEditRowDialogContent({
                internalEditComponents,
                row,
                table,
            })))) !== null && _b !== void 0 ? _b : (jsxs(Fragment, { children: [jsx(DialogTitle, { sx: { textAlign: 'center' }, children: localization.edit }), jsx(DialogContent, { children: jsx("form", { onSubmit: (e) => e.preventDefault(), children: jsx(Stack, { sx: {
                                gap: '32px',
                                paddingTop: '16px',
                                width: '100%',
                            }, children: internalEditComponents }) }) }), jsx(DialogActions, { sx: { p: '1.25rem' }, children: jsx(MRT_EditActionButtons, { row: row, table: table, variant: "text" }) })] })) })));
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const MRT_TableContainer = (_a) => {
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { createDisplayMode, editDisplayMode, enableCellActions, enableStickyHeader, muiTableContainerProps, }, refs: { bottomToolbarRef, tableContainerRef, topToolbarRef }, } = table;
    const { actionCell, creatingRow, editingRow, isFullScreen, isLoading, showLoadingOverlay, } = getState();
    const loading = showLoadingOverlay !== false && (isLoading || showLoadingOverlay);
    const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);
    const tableContainerProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTableContainerProps, {
        table,
    })), rest);
    useIsomorphicLayoutEffect(() => {
        var _a, _b, _c, _d;
        const topToolbarHeight = typeof document !== 'undefined'
            ? (_b = (_a = topToolbarRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) !== null && _b !== void 0 ? _b : 0
            : 0;
        const bottomToolbarHeight = typeof document !== 'undefined'
            ? (_d = (_c = bottomToolbarRef === null || bottomToolbarRef === void 0 ? void 0 : bottomToolbarRef.current) === null || _c === void 0 ? void 0 : _c.offsetHeight) !== null && _d !== void 0 ? _d : 0
            : 0;
        setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
    });
    const createModalOpen = createDisplayMode === 'modal' && creatingRow;
    const editModalOpen = editDisplayMode === 'modal' && editingRow;
    return (jsxs(TableContainer, Object.assign({ "aria-busy": loading, "aria-describedby": loading ? 'mrt-progress' : undefined }, tableContainerProps, { ref: (node) => {
            if (node) {
                tableContainerRef.current = node;
                if (tableContainerProps === null || tableContainerProps === void 0 ? void 0 : tableContainerProps.ref) {
                    //@ts-ignore
                    tableContainerProps.ref.current = node;
                }
            }
        }, style: Object.assign({ maxHeight: isFullScreen
                ? `calc(100vh - ${totalToolbarHeight}px)`
                : undefined }, tableContainerProps === null || tableContainerProps === void 0 ? void 0 : tableContainerProps.style), sx: (theme) => (Object.assign({ maxHeight: enableStickyHeader
                ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 9999px)`
                : undefined, maxWidth: '100%', overflow: 'auto', position: 'relative' }, parseFromValuesOrFunc(tableContainerProps === null || tableContainerProps === void 0 ? void 0 : tableContainerProps.sx, theme))), children: [loading ? jsx(MRT_TableLoadingOverlay, { table: table }) : null, jsx(MRT_Table, { table: table }), (createModalOpen || editModalOpen) && (jsx(MRT_EditRowModal, { open: true, table: table })), enableCellActions && actionCell && jsx(MRT_CellActionMenu, { table: table })] })));
};

const MRT_LinearProgressBar = (_a) => {
    var { isTopToolbar, table } = _a, rest = __rest(_a, ["isTopToolbar", "table"]);
    const { getState, options: { muiLinearProgressProps }, } = table;
    const { isSaving, showProgressBars } = getState();
    const linearProgressProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiLinearProgressProps, {
        isTopToolbar,
        table,
    })), rest);
    return (jsx(Collapse, { in: showProgressBars !== false && (showProgressBars || isSaving), mountOnEnter: true, sx: {
            bottom: isTopToolbar ? 0 : undefined,
            position: 'absolute',
            top: !isTopToolbar ? 0 : undefined,
            width: '100%',
        }, unmountOnExit: true, children: jsx(LinearProgress, Object.assign({ "aria-busy": "true", "aria-label": "Loading", sx: { position: 'relative' } }, linearProgressProps)) }));
};

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100];
const MRT_TablePagination = (_a) => {
    var { position = 'bottom', table } = _a, rest = __rest(_a, ["position", "table"]);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 720px)');
    const { getState, options: { enableToolbarInternalActions, icons: { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon }, localization, muiPaginationProps, paginationDisplayMode, }, } = table;
    const { pagination: { pageIndex = 0, pageSize = 10 }, showGlobalFilter, } = getState();
    const paginationProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiPaginationProps, {
        table,
    })), rest);
    const totalRowCount = table.getRowCount();
    const numberOfPages = table.getPageCount();
    const showFirstLastPageButtons = numberOfPages > 2;
    const firstRowIndex = pageIndex * pageSize;
    const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);
    const _b = paginationProps !== null && paginationProps !== void 0 ? paginationProps : {}, { SelectProps = {}, disabled = false, rowsPerPageOptions = defaultRowsPerPage, showFirstButton = showFirstLastPageButtons, showLastButton = showFirstLastPageButtons, showRowsPerPage = true } = _b, restPaginationProps = __rest(_b, ["SelectProps", "disabled", "rowsPerPageOptions", "showFirstButton", "showLastButton", "showRowsPerPage"]);
    const disableBack = pageIndex <= 0 || disabled;
    const disableNext = lastRowIndex >= totalRowCount || disabled;
    if (isMobile && (SelectProps === null || SelectProps === void 0 ? void 0 : SelectProps.native) !== false) {
        SelectProps.native = true;
    }
    const tooltipProps = getCommonTooltipProps();
    return (jsxs(Box, { className: "MuiTablePagination-root", sx: {
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: { md: 'space-between', sm: 'center' },
            justifySelf: 'flex-end',
            mt: position === 'top' &&
                enableToolbarInternalActions &&
                !showGlobalFilter
                ? '3rem'
                : undefined,
            position: 'relative',
            px: '8px',
            py: '12px',
            zIndex: 2,
        }, children: [showRowsPerPage && (jsxs(Box, { sx: { alignItems: 'center', display: 'flex', gap: '8px' }, children: [jsx(InputLabel, { htmlFor: "mrt-rows-per-page", sx: { mb: 0 }, children: localization.rowsPerPage }), jsx(Select, Object.assign({ MenuProps: { disableScrollLock: true }, disableUnderline: true, disabled: disabled, inputProps: {
                            'aria-label': localization.rowsPerPage,
                            id: 'mrt-rows-per-page',
                        }, label: localization.rowsPerPage, onChange: (event) => table.setPageSize(+event.target.value), sx: { mb: 0 }, value: pageSize, variant: "standard" }, SelectProps, { children: rowsPerPageOptions.map((option) => {
                            var _a;
                            const value = typeof option !== 'number' ? option.value : option;
                            const label = typeof option !== 'number' ? option.label : `${option}`;
                            return ((_a = SelectProps === null || SelectProps === void 0 ? void 0 : SelectProps.children) !== null && _a !== void 0 ? _a : ((SelectProps === null || SelectProps === void 0 ? void 0 : SelectProps.native) ? (jsx("option", { value: value, children: label }, value)) : (jsx(MenuItem, { sx: { m: 0 }, value: value, children: label }, value))));
                        }) }))] })), paginationDisplayMode === 'pages' ? (jsx(Pagination, Object.assign({ count: numberOfPages, disabled: disabled, onChange: (_e, newPageIndex) => table.setPageIndex(newPageIndex - 1), page: pageIndex + 1, renderItem: (item) => (jsx(PaginationItem, Object.assign({ slots: {
                        first: FirstPageIcon,
                        last: LastPageIcon,
                        next: ChevronRightIcon,
                        previous: ChevronLeftIcon,
                    } }, item))), showFirstButton: showFirstButton, showLastButton: showLastButton }, restPaginationProps))) : paginationDisplayMode === 'default' ? (jsxs(Fragment, { children: [jsx(Typography, { align: "center", component: "span", sx: { m: '0 4px', minWidth: '8ch' }, variant: "body2", children: `${lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()}-${lastRowIndex.toLocaleString()} ${localization.of} ${totalRowCount.toLocaleString()}` }), jsxs(Box, { gap: "xs", children: [showFirstButton && (jsx(Tooltip, Object.assign({}, tooltipProps, { title: localization.goToFirstPage, children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.goToFirstPage, disabled: disableBack, onClick: () => table.firstPage(), size: "small", children: jsx(FirstPageIcon, Object.assign({}, flipIconStyles(theme))) }) }) }))), jsx(Tooltip, Object.assign({}, tooltipProps, { title: localization.goToPreviousPage, children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.goToPreviousPage, disabled: disableBack, onClick: () => table.previousPage(), size: "small", children: jsx(ChevronLeftIcon, Object.assign({}, flipIconStyles(theme))) }) }) })), jsx(Tooltip, Object.assign({}, tooltipProps, { title: localization.goToNextPage, children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.goToNextPage, disabled: disableNext, onClick: () => table.nextPage(), size: "small", children: jsx(ChevronRightIcon, Object.assign({}, flipIconStyles(theme))) }) }) })), showLastButton && (jsx(Tooltip, Object.assign({}, tooltipProps, { title: localization.goToLastPage, children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.goToLastPage, disabled: disableNext, onClick: () => table.lastPage(), size: "small", children: jsx(LastPageIcon, Object.assign({}, flipIconStyles(theme))) }) }) })))] })] })) : null] }));
};

const MRT_ToolbarDropZone = (_a) => {
    var _b, _c;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { enableGrouping, localization }, setHoveredColumn, setShowToolbarDropZone, } = table;
    const { draggingColumn, grouping, hoveredColumn, showToolbarDropZone } = getState();
    const handleDragEnter = (_event) => {
        setHoveredColumn({ id: 'drop-zone' });
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        var _a;
        if (((_a = table.options.state) === null || _a === void 0 ? void 0 : _a.showToolbarDropZone) !== undefined) {
            setShowToolbarDropZone(!!enableGrouping &&
                !!draggingColumn &&
                draggingColumn.columnDef.enableGrouping !== false &&
                !grouping.includes(draggingColumn.id));
        }
    }, [enableGrouping, draggingColumn, grouping]);
    return (jsx(Fade, { in: showToolbarDropZone, children: jsx(Box, Object.assign({ className: "Mui-ToolbarDropZone", onDragEnter: handleDragEnter, onDragOver: handleDragOver }, rest, { sx: (theme) => (Object.assign({ alignItems: 'center', backdropFilter: 'blur(4px)', backgroundColor: alpha(theme.palette.info.main, (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === 'drop-zone' ? 0.2 : 0.1), border: `dashed ${theme.palette.info.main} 2px`, boxSizing: 'border-box', display: 'flex', height: '100%', justifyContent: 'center', position: 'absolute', width: '100%', zIndex: 4 }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: jsx(Typography, { fontStyle: "italic", children: localization.dropToGroupBy.replace('{column}', (_c = (_b = draggingColumn === null || draggingColumn === void 0 ? void 0 : draggingColumn.columnDef) === null || _b === void 0 ? void 0 : _b.header) !== null && _c !== void 0 ? _c : '') }) })) }));
};

const MRT_BottomToolbar = (_a) => {
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { enablePagination, muiBottomToolbarProps, positionPagination, positionToolbarAlertBanner, positionToolbarDropZone, renderBottomToolbarCustomActions, }, refs: { bottomToolbarRef }, } = table;
    const { isFullScreen } = getState();
    const isMobile = useMediaQuery('(max-width:720px)');
    const toolbarProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiBottomToolbarProps, { table })), rest);
    const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;
    return (jsxs(Box, Object.assign({}, toolbarProps, { ref: (node) => {
            if (node) {
                bottomToolbarRef.current = node;
                if (toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.ref) {
                    // @ts-ignore
                    toolbarProps.ref.current = node;
                }
            }
        }, sx: (theme) => (Object.assign(Object.assign(Object.assign({}, getCommonToolbarStyles({ table, theme })), { bottom: isFullScreen ? '0' : undefined, boxShadow: `0 1px 2px -1px ${alpha(theme.palette.grey[700], 0.5)} inset`, left: 0, position: isFullScreen ? 'fixed' : 'relative', right: 0 }), parseFromValuesOrFunc(toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.sx, theme))), children: [jsx(MRT_LinearProgressBar, { isTopToolbar: false, table: table }), positionToolbarAlertBanner === 'bottom' && (jsx(MRT_ToolbarAlertBanner, { stackAlertBanner: stackAlertBanner, table: table })), ['both', 'bottom'].includes(positionToolbarDropZone !== null && positionToolbarDropZone !== void 0 ? positionToolbarDropZone : '') && (jsx(MRT_ToolbarDropZone, { table: table })), jsxs(Box, { sx: {
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: '0.5rem',
                    width: '100%',
                }, children: [renderBottomToolbarCustomActions ? (renderBottomToolbarCustomActions({ table })) : (jsx("span", {})), jsx(Box, { sx: {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: stackAlertBanner ? 'relative' : 'absolute',
                            right: 0,
                            top: 0,
                        }, children: enablePagination &&
                            ['both', 'bottom'].includes(positionPagination !== null && positionPagination !== void 0 ? positionPagination : '') && (jsx(MRT_TablePagination, { position: "bottom", table: table })) })] })] })));
};

const MRT_ColumnPinningButtons = (_a) => {
    var { column, table } = _a, rest = __rest(_a, ["column", "table"]);
    const { options: { icons: { PushPinIcon }, localization, }, } = table;
    const handlePinColumn = (pinDirection) => {
        column.pin(pinDirection);
    };
    return (jsx(Box, Object.assign({}, rest, { sx: (theme) => (Object.assign({ minWidth: '70px', textAlign: 'center' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: column.getIsPinned() ? (jsx(Tooltip, { title: localization.unpin, children: jsx(IconButton, { onClick: () => handlePinColumn(false), size: "small", children: jsx(PushPinIcon, {}) }) })) : (jsxs(Fragment, { children: [jsx(Tooltip, { title: localization.pinToLeft, children: jsx(IconButton, { onClick: () => handlePinColumn('left'), size: "small", children: jsx(PushPinIcon, { style: {
                                transform: 'rotate(90deg)',
                            } }) }) }), jsx(Tooltip, { title: localization.pinToRight, children: jsx(IconButton, { onClick: () => handlePinColumn('right'), size: "small", children: jsx(PushPinIcon, { style: {
                                transform: 'rotate(-90deg)',
                            } }) }) })] })) })));
};

const MRT_ShowHideColumnsMenuItems = (_a) => {
    var _b;
    var { allColumns, column, hoveredColumn, isNestedColumns, setHoveredColumn, table } = _a, rest = __rest(_a, ["allColumns", "column", "hoveredColumn", "isNestedColumns", "setHoveredColumn", "table"]);
    const { getState, options: { enableColumnOrdering, enableColumnPinning, enableHiding, localization, mrtTheme: { draggingBorderColor }, }, setColumnOrder, } = table;
    const { columnOrder } = getState();
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const switchChecked = column.getIsVisible();
    const handleToggleColumnHidden = (column) => {
        var _a, _b;
        if (columnDefType === 'group') {
            (_b = (_a = column === null || column === void 0 ? void 0 : column.columns) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (childColumn) => {
                childColumn.toggleVisibility(!switchChecked);
            });
        }
        else {
            column.toggleVisibility();
        }
    };
    const menuItemRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const handleDragStart = (e) => {
        setIsDragging(true);
        try {
            e.dataTransfer.setDragImage(menuItemRef.current, 0, 0);
        }
        catch (e) {
            console.error(e);
        }
    };
    const handleDragEnd = (_e) => {
        setIsDragging(false);
        setHoveredColumn(null);
        if (hoveredColumn) {
            setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
        }
    };
    const handleDragEnter = (_e) => {
        if (!isDragging && columnDef.enableColumnOrdering !== false) {
            setHoveredColumn(column);
        }
    };
    if (!columnDef.header || columnDef.visibleInShowHideMenu === false) {
        return null;
    }
    return (jsxs(Fragment, { children: [jsx(MenuItem, Object.assign({ disableRipple: true, onDragEnter: handleDragEnter, ref: menuItemRef }, rest, { sx: (theme) => (Object.assign({ alignItems: 'center', justifyContent: 'flex-start', my: 0, opacity: isDragging ? 0.5 : 1, outline: isDragging
                        ? `2px dashed ${theme.palette.grey[500]}`
                        : (hoveredColumn === null || hoveredColumn === void 0 ? void 0 : hoveredColumn.id) === column.id
                            ? `2px dashed ${draggingBorderColor}`
                            : 'none', outlineOffset: '-2px', pl: `${(column.depth + 0.5) * 2}rem`, py: '6px' }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: jsxs(Box, { sx: {
                        display: 'flex',
                        flexWrap: 'nowrap',
                        gap: '8px',
                    }, children: [columnDefType !== 'group' &&
                            enableColumnOrdering &&
                            !isNestedColumns &&
                            (columnDef.enableColumnOrdering !== false ? (jsx(MRT_GrabHandleButton, { onDragEnd: handleDragEnd, onDragStart: handleDragStart, table: table })) : (jsx(Box, { sx: { width: '28px' } }))), enableColumnPinning &&
                            (column.getCanPin() ? (jsx(MRT_ColumnPinningButtons, { column: column, table: table })) : (jsx(Box, { sx: { width: '70px' } }))), enableHiding ? (jsx(FormControlLabel, { checked: switchChecked, componentsProps: {
                                typography: {
                                    sx: {
                                        mb: 0,
                                        opacity: columnDefType !== 'display' ? 1 : 0.5,
                                    },
                                },
                            }, control: jsx(Tooltip, Object.assign({}, getCommonTooltipProps(), { title: localization.toggleVisibility, children: jsx(Switch, {}) })), disabled: !column.getCanHide(), label: columnDef.header, onChange: () => handleToggleColumnHidden(column) })) : (jsx(Typography, { sx: { alignSelf: 'center' }, children: columnDef.header }))] }) })), (_b = column.columns) === null || _b === void 0 ? void 0 : _b.map((c, i) => (jsx(MRT_ShowHideColumnsMenuItems, { allColumns: allColumns, column: c, hoveredColumn: hoveredColumn, isNestedColumns: isNestedColumns, setHoveredColumn: setHoveredColumn, table: table }, `${i}-${c.id}`)))] }));
};

const MRT_ShowHideColumnsMenu = (_a) => {
    var { anchorEl, setAnchorEl, table } = _a, rest = __rest(_a, ["anchorEl", "setAnchorEl", "table"]);
    const { getAllColumns, getAllLeafColumns, getCenterLeafColumns, getIsAllColumnsVisible, getIsSomeColumnsPinned, getIsSomeColumnsVisible, getLeftLeafColumns, getRightLeafColumns, getState, options: { enableColumnOrdering, enableColumnPinning, enableHiding, localization, mrtTheme: { menuBackgroundColor }, }, } = table;
    const { columnOrder, columnPinning, density } = getState();
    const handleToggleAllColumns = (value) => {
        getAllLeafColumns()
            .filter((col) => col.columnDef.enableHiding !== false)
            .forEach((col) => col.toggleVisibility(value));
    };
    const allColumns = useMemo(() => {
        const columns = getAllColumns();
        if (columnOrder.length > 0 &&
            !columns.some((col) => col.columnDef.columnDefType === 'group')) {
            return [
                ...getLeftLeafColumns(),
                ...Array.from(new Set(columnOrder)).map((colId) => getCenterLeafColumns().find((col) => (col === null || col === void 0 ? void 0 : col.id) === colId)),
                ...getRightLeafColumns(),
            ].filter(Boolean);
        }
        return columns;
    }, [
        columnOrder,
        columnPinning,
        getAllColumns(),
        getCenterLeafColumns(),
        getLeftLeafColumns(),
        getRightLeafColumns(),
    ]);
    const isNestedColumns = allColumns.some((col) => col.columnDef.columnDefType === 'group');
    const [hoveredColumn, setHoveredColumn] = useState(null);
    return (jsxs(Menu, Object.assign({ MenuListProps: {
            dense: density === 'compact',
            sx: {
                backgroundColor: menuBackgroundColor,
            },
        }, anchorEl: anchorEl, disableScrollLock: true, onClose: () => setAnchorEl(null), open: !!anchorEl }, rest, { children: [jsxs(Box, { sx: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: '0.5rem',
                    pt: 0,
                }, children: [enableHiding && (jsx(Button, { disabled: !getIsSomeColumnsVisible(), onClick: () => handleToggleAllColumns(false), children: localization.hideAll })), enableColumnOrdering && (jsx(Button, { onClick: () => table.setColumnOrder(getDefaultColumnOrderIds(table.options, true)), children: localization.resetOrder })), enableColumnPinning && (jsx(Button, { disabled: !getIsSomeColumnsPinned(), onClick: () => table.resetColumnPinning(true), children: localization.unpinAll })), enableHiding && (jsx(Button, { disabled: getIsAllColumnsVisible(), onClick: () => handleToggleAllColumns(true), children: localization.showAll }))] }), jsx(Divider, {}), allColumns.map((column, index) => (jsx(MRT_ShowHideColumnsMenuItems, { allColumns: allColumns, column: column, hoveredColumn: hoveredColumn, isNestedColumns: isNestedColumns, setHoveredColumn: setHoveredColumn, table: table }, `${index}-${column.id}`)))] })));
};

const MRT_ShowHideColumnsButton = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { options: { icons: { ViewColumnIcon }, localization, }, } = table;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (jsxs(Fragment, { children: [jsx(Tooltip, { title: (_b = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _b !== void 0 ? _b : localization.showHideColumns, children: jsx(IconButton, Object.assign({ "aria-label": localization.showHideColumns, onClick: handleClick }, rest, { title: undefined, children: jsx(ViewColumnIcon, {}) })) }), anchorEl && (jsx(MRT_ShowHideColumnsMenu, { anchorEl: anchorEl, setAnchorEl: setAnchorEl, table: table }))] }));
};

const MRT_ToggleDensePaddingButton = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { icons: { DensityLargeIcon, DensityMediumIcon, DensitySmallIcon }, localization, }, setDensity, } = table;
    const { density } = getState();
    const handleToggleDensePadding = () => {
        const nextDensity = density === 'comfortable'
            ? 'compact'
            : density === 'compact'
                ? 'spacious'
                : 'comfortable';
        setDensity(nextDensity);
    };
    return (jsx(Tooltip, { title: (_b = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _b !== void 0 ? _b : localization.toggleDensity, children: jsx(IconButton, Object.assign({ "aria-label": localization.toggleDensity, onClick: handleToggleDensePadding }, rest, { title: undefined, children: density === 'compact' ? (jsx(DensitySmallIcon, {})) : density === 'comfortable' ? (jsx(DensityMediumIcon, {})) : (jsx(DensityLargeIcon, {})) })) }));
};

const MRT_ToggleFiltersButton = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { icons: { FilterListIcon, FilterListOffIcon }, localization, }, setShowColumnFilters, } = table;
    const { showColumnFilters } = getState();
    const handleToggleShowFilters = () => {
        setShowColumnFilters(!showColumnFilters);
    };
    return (jsx(Tooltip, { title: (_b = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _b !== void 0 ? _b : localization.showHideFilters, children: jsx(IconButton, Object.assign({ "aria-label": localization.showHideFilters, onClick: handleToggleShowFilters }, rest, { title: undefined, children: showColumnFilters ? jsx(FilterListOffIcon, {}) : jsx(FilterListIcon, {}) })) }));
};

const MRT_ToggleFullScreenButton = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { icons: { FullscreenExitIcon, FullscreenIcon }, localization, }, setIsFullScreen, } = table;
    const { isFullScreen } = getState();
    const [tooltipOpened, setTooltipOpened] = useState(false);
    const handleToggleFullScreen = () => {
        setTooltipOpened(false);
        setIsFullScreen(!isFullScreen);
    };
    return (jsx(Tooltip, { open: tooltipOpened, title: (_b = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _b !== void 0 ? _b : localization.toggleFullScreen, children: jsx(IconButton, Object.assign({ "aria-label": localization.toggleFullScreen, onClick: handleToggleFullScreen, onMouseEnter: () => setTooltipOpened(true), onMouseLeave: () => setTooltipOpened(false) }, rest, { title: undefined, children: isFullScreen ? jsx(FullscreenExitIcon, {}) : jsx(FullscreenIcon, {}) })) }));
};

const MRT_ToggleGlobalFilterButton = (_a) => {
    var _b, _c;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { icons: { SearchIcon, SearchOffIcon }, localization, }, refs: { searchInputRef }, setShowGlobalFilter, } = table;
    const { globalFilter, showGlobalFilter } = getState();
    const handleToggleSearch = () => {
        setShowGlobalFilter(!showGlobalFilter);
        queueMicrotask(() => { var _a; return (_a = searchInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); });
    };
    return (jsx(Tooltip, { title: (_b = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _b !== void 0 ? _b : localization.showHideSearch, children: jsx(IconButton, Object.assign({ "aria-label": (_c = rest === null || rest === void 0 ? void 0 : rest.title) !== null && _c !== void 0 ? _c : localization.showHideSearch, disabled: !!globalFilter, onClick: handleToggleSearch }, rest, { title: undefined, children: showGlobalFilter ? jsx(SearchOffIcon, {}) : jsx(SearchIcon, {}) })) }));
};

const MRT_ToolbarInternalButtons = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { options: { columnFilterDisplayMode, enableColumnFilters, enableColumnOrdering, enableColumnPinning, enableDensityToggle, enableFilters, enableFullScreenToggle, enableGlobalFilter, enableHiding, initialState, renderToolbarInternalActions, }, } = table;
    return (jsx(Box, Object.assign({}, rest, { sx: (theme) => (Object.assign({ alignItems: 'center', display: 'flex', zIndex: 3 }, parseFromValuesOrFunc(rest === null || rest === void 0 ? void 0 : rest.sx, theme))), children: (_b = renderToolbarInternalActions === null || renderToolbarInternalActions === void 0 ? void 0 : renderToolbarInternalActions({
            table,
        })) !== null && _b !== void 0 ? _b : (jsxs(Fragment, { children: [enableFilters &&
                    enableGlobalFilter &&
                    !(initialState === null || initialState === void 0 ? void 0 : initialState.showGlobalFilter) && (jsx(MRT_ToggleGlobalFilterButton, { table: table })), enableFilters &&
                    enableColumnFilters &&
                    columnFilterDisplayMode !== 'popover' && (jsx(MRT_ToggleFiltersButton, { table: table })), (enableHiding || enableColumnOrdering || enableColumnPinning) && (jsx(MRT_ShowHideColumnsButton, { table: table })), enableDensityToggle && (jsx(MRT_ToggleDensePaddingButton, { table: table })), enableFullScreenToggle && (jsx(MRT_ToggleFullScreenButton, { table: table }))] })) })));
};

const MRT_GlobalFilterTextField = (_a) => {
    var _b;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { enableGlobalFilterModes, icons: { CloseIcon, SearchIcon }, localization, muiSearchTextFieldProps, }, refs: { searchInputRef }, setGlobalFilter, } = table;
    const { globalFilter, showGlobalFilter } = getState();
    const textFieldProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiSearchTextFieldProps, {
        table,
    })), rest);
    const isMounted = useRef(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchValue, setSearchValue] = useState(globalFilter !== null && globalFilter !== void 0 ? globalFilter : '');
    const handleSetGlobalFilter = useCallback((event) => {
        var _a;
        setGlobalFilter((_a = event.target.value) !== null && _a !== void 0 ? _a : undefined);
    }, []);
    const handleChange = (event) => {
        setSearchValue(event.target.value);
        handleSetGlobalFilter(event);
    };
    const handleGlobalFilterMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClear = () => {
        setSearchValue('');
        setGlobalFilter(undefined);
    };
    useEffect(() => {
        if (isMounted.current) {
            if (globalFilter === undefined) {
                handleClear();
            }
            else {
                setSearchValue(globalFilter);
            }
        }
        isMounted.current = true;
    }, [globalFilter]);
    return (jsxs(Collapse, { in: showGlobalFilter, mountOnEnter: true, orientation: "horizontal", unmountOnExit: true, children: [jsx(TextField, Object.assign({ inputProps: Object.assign({ autoComplete: 'new-password' }, textFieldProps.inputProps), onChange: handleChange, placeholder: localization.search, size: "small", value: searchValue !== null && searchValue !== void 0 ? searchValue : '', variant: "outlined" }, textFieldProps, { InputProps: Object.assign(Object.assign({ endAdornment: (jsx(InputAdornment, { position: "end", children: jsx(Tooltip, { title: (_b = localization.clearSearch) !== null && _b !== void 0 ? _b : '', children: jsx("span", { children: jsx(IconButton, { "aria-label": localization.clearSearch, disabled: !(searchValue === null || searchValue === void 0 ? void 0 : searchValue.length), onClick: handleClear, size: "small", children: jsx(CloseIcon, {}) }) }) }) })), startAdornment: enableGlobalFilterModes ? (jsx(InputAdornment, { position: "start", children: jsx(Tooltip, { title: localization.changeSearchMode, children: jsx(IconButton, { "aria-label": localization.changeSearchMode, onClick: handleGlobalFilterMenuOpen, size: "small", sx: { height: '1.75rem', width: '1.75rem' }, children: jsx(SearchIcon, {}) }) }) })) : (jsx(SearchIcon, { style: { marginRight: '4px' } })) }, textFieldProps.InputProps), { sx: (theme) => {
                        var _a;
                        return (Object.assign({ mb: 0 }, parseFromValuesOrFunc((_a = textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.InputProps) === null || _a === void 0 ? void 0 : _a.sx, theme)));
                    } }), inputRef: (inputRef) => {
                    searchInputRef.current = inputRef;
                    if (textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.inputRef) {
                        textFieldProps.inputRef = inputRef;
                    }
                } })), jsx(MRT_FilterOptionMenu, { anchorEl: anchorEl, onSelect: handleClear, setAnchorEl: setAnchorEl, table: table })] }));
};

const MRT_TopToolbar = ({ table, }) => {
    var _a;
    const { getState, options: { enableGlobalFilter, enablePagination, enableToolbarInternalActions, muiTopToolbarProps, positionGlobalFilter, positionPagination, positionToolbarAlertBanner, positionToolbarDropZone, renderTopToolbarCustomActions, }, refs: { topToolbarRef }, } = table;
    const { isFullScreen, showGlobalFilter } = getState();
    const isMobile = useMediaQuery('(max-width:720px)');
    const isTablet = useMediaQuery('(max-width:1024px)');
    const toolbarProps = parseFromValuesOrFunc(muiTopToolbarProps, { table });
    const stackAlertBanner = isMobile ||
        !!renderTopToolbarCustomActions ||
        (showGlobalFilter && isTablet);
    const globalFilterProps = {
        sx: !isTablet
            ? {
                zIndex: 2,
            }
            : undefined,
        table,
    };
    return (jsxs(Box, Object.assign({}, toolbarProps, { ref: (ref) => {
            topToolbarRef.current = ref;
            if (toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.ref) {
                // @ts-ignore
                toolbarProps.ref.current = ref;
            }
        }, sx: (theme) => (Object.assign(Object.assign(Object.assign({}, getCommonToolbarStyles({ table, theme })), { position: isFullScreen ? 'sticky' : 'relative', top: isFullScreen ? '0' : undefined }), parseFromValuesOrFunc(toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.sx, theme))), children: [positionToolbarAlertBanner === 'top' && (jsx(MRT_ToolbarAlertBanner, { stackAlertBanner: stackAlertBanner, table: table })), ['both', 'top'].includes(positionToolbarDropZone !== null && positionToolbarDropZone !== void 0 ? positionToolbarDropZone : '') && (jsx(MRT_ToolbarDropZone, { table: table })), jsxs(Box, { sx: {
                    alignItems: 'flex-start',
                    boxSizing: 'border-box',
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'space-between',
                    p: '0.5rem',
                    position: stackAlertBanner ? 'relative' : 'absolute',
                    right: 0,
                    top: 0,
                    width: '100%',
                }, children: [enableGlobalFilter && positionGlobalFilter === 'left' && (jsx(MRT_GlobalFilterTextField, Object.assign({}, globalFilterProps))), (_a = renderTopToolbarCustomActions === null || renderTopToolbarCustomActions === void 0 ? void 0 : renderTopToolbarCustomActions({ table })) !== null && _a !== void 0 ? _a : jsx("span", {}), enableToolbarInternalActions ? (jsxs(Box, { sx: {
                            alignItems: 'center',
                            display: 'flex',
                            flexWrap: 'wrap-reverse',
                            gap: '0.5rem',
                            justifyContent: 'flex-end',
                        }, children: [enableGlobalFilter && positionGlobalFilter === 'right' && (jsx(MRT_GlobalFilterTextField, Object.assign({}, globalFilterProps))), jsx(MRT_ToolbarInternalButtons, { table: table })] })) : (enableGlobalFilter &&
                        positionGlobalFilter === 'right' && (jsx(MRT_GlobalFilterTextField, Object.assign({}, globalFilterProps))))] }), enablePagination &&
                ['both', 'top'].includes(positionPagination !== null && positionPagination !== void 0 ? positionPagination : '') && (jsx(MRT_TablePagination, { position: "top", table: table })), jsx(MRT_LinearProgressBar, { isTopToolbar: true, table: table })] })));
};

const MRT_TablePaper = (_a) => {
    var _b, _c;
    var { table } = _a, rest = __rest(_a, ["table"]);
    const { getState, options: { enableBottomToolbar, enableTopToolbar, mrtTheme: { baseBackgroundColor }, muiTablePaperProps, renderBottomToolbar, renderTopToolbar, }, refs: { tablePaperRef }, } = table;
    const { isFullScreen } = getState();
    const paperProps = Object.assign(Object.assign({}, parseFromValuesOrFunc(muiTablePaperProps, { table })), rest);
    return (jsxs(Paper, Object.assign({ elevation: 2 }, paperProps, { ref: (ref) => {
            tablePaperRef.current = ref;
            if (paperProps === null || paperProps === void 0 ? void 0 : paperProps.ref) {
                //@ts-ignore
                paperProps.ref.current = ref;
            }
        }, style: Object.assign(Object.assign({}, (isFullScreen
            ? {
                bottom: 0,
                height: '100dvh',
                left: 0,
                margin: 0,
                maxHeight: '100dvh',
                maxWidth: '100dvw',
                padding: 0,
                position: 'fixed',
                right: 0,
                top: 0,
                width: '100dvw',
                zIndex: 999,
            }
            : {})), paperProps === null || paperProps === void 0 ? void 0 : paperProps.style), sx: (theme) => (Object.assign({ backgroundColor: baseBackgroundColor, backgroundImage: 'unset', overflow: 'hidden', transition: 'all 100ms ease-in-out' }, parseFromValuesOrFunc(paperProps === null || paperProps === void 0 ? void 0 : paperProps.sx, theme))), children: [enableTopToolbar &&
                ((_b = parseFromValuesOrFunc(renderTopToolbar, { table })) !== null && _b !== void 0 ? _b : (jsx(MRT_TopToolbar, { table: table }))), jsx(MRT_TableContainer, { table: table }), enableBottomToolbar &&
                ((_c = parseFromValuesOrFunc(renderBottomToolbar, { table })) !== null && _c !== void 0 ? _c : (jsx(MRT_BottomToolbar, { table: table })))] })));
};

const isTableInstanceProp = (props) => props.table !== undefined;
const MaterialReactTable = (props) => {
    let table;
    if (isTableInstanceProp(props)) {
        table = props.table;
    }
    else {
        table = useMaterialReactTable(props);
    }
    return jsx(MRT_TablePaper, { table: table });
};

export { MRT_ActionMenuItem, MRT_AggregationFns, MRT_BottomToolbar, MRT_ColumnActionMenu, MRT_ColumnPinningButtons, MRT_CopyButton, MRT_DefaultColumn, MRT_DefaultDisplayColumn, MRT_EditActionButtons, MRT_EditCellTextField, MRT_EditRowModal, MRT_ExpandAllButton, MRT_ExpandButton, MRT_FilterCheckbox, MRT_FilterFns, MRT_FilterOptionMenu, MRT_FilterRangeFields, MRT_FilterRangeSlider, MRT_FilterTextField, MRT_GlobalFilterTextField, MRT_GrabHandleButton, MRT_LinearProgressBar, MRT_RowActionMenu, MRT_RowPinButton, MRT_SelectCheckbox, MRT_ShowHideColumnsButton, MRT_ShowHideColumnsMenu, MRT_ShowHideColumnsMenuItems, MRT_SortingFns, MRT_Table, MRT_TableBody, MRT_TableBodyCell, MRT_TableBodyCellValue, MRT_TableBodyRow, MRT_TableBodyRowGrabHandle, MRT_TableBodyRowPinButton, MRT_TableContainer, MRT_TableDetailPanel, MRT_TableFooter, MRT_TableFooterCell, MRT_TableFooterRow, MRT_TableHead, MRT_TableHeadCell, MRT_TableHeadCellColumnActionsButton, MRT_TableHeadCellFilterContainer, MRT_TableHeadCellFilterLabel, MRT_TableHeadCellGrabHandle, MRT_TableHeadCellResizeHandle, MRT_TableHeadCellSortLabel, MRT_TableHeadRow, MRT_TableLoadingOverlay, MRT_TablePagination, MRT_TablePaper, MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton, MRT_ToggleFullScreenButton, MRT_ToggleGlobalFilterButton, MRT_ToggleRowActionMenuButton, MRT_ToolbarAlertBanner, MRT_ToolbarDropZone, MRT_ToolbarInternalButtons, MRT_TopToolbar, MaterialReactTable, Memo_MRT_TableBody, Memo_MRT_TableBodyCell, Memo_MRT_TableBodyRow, createMRTColumnHelper, createRow, defaultDisplayColumnProps, flexRender, getAllLeafColumnDefs, getCanRankRows, getColumnFilterInfo, getColumnId, getDefaultColumnFilterFn, getDefaultColumnOrderIds, getIsRankingRows, getIsRowSelected, getLeadingDisplayColumnIds, getMRT_RowSelectionHandler, getMRT_Rows, getMRT_SelectAllHandler, getTrailingDisplayColumnIds, isCellEditable, mrtFilterOptions, openEditingCell, prepareColumns, rankGlobalFuzzy, reorderColumn, showRowActionsColumn, showRowDragColumn, showRowExpandColumn, showRowNumbersColumn, showRowPinningColumn, showRowSelectionColumn, showRowSpacerColumn, useDropdownOptions, useMRT_ColumnVirtualizer, useMRT_Effects, useMRT_RowVirtualizer, useMRT_Rows, useMRT_TableInstance, useMRT_TableOptions, useMaterialReactTable };
//# sourceMappingURL=index.esm.js.map
