import {
  Heading,
  StyledTable,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeadCell,
  Subtitle,
  Wrapper,
} from './Table.styles';
import { ReactNode } from 'react';
import { Size, SizeDict } from '../../types/Dicts';

export type TableFieldProps<T> = {
  header: string;
  valueKey: keyof T;
};

export type TableProps<T> = {
  name?: string;
  subtitle: string;
  fields: TableFieldProps<T>[];
  data: T[];
  size?: Size;
};

export const Table = <T,>({ name, subtitle, fields, data, size = SizeDict.L }: TableProps<T>) => {
  return (
    <Wrapper>
      {name && <Heading $size={size}>{name}</Heading>}
      <Subtitle $size={size}>{subtitle}</Subtitle>
      <div>
        <StyledTable>
          <StyledTableHead>
            {fields.map(({ header }, index) => (
              <tr key={`header-${index}`}>
                <StyledTableHeadCell>{header}</StyledTableHeadCell>
              </tr>
            ))}
          </StyledTableHead>
          <tbody>
            {data.map((dataRow: T, indexRow: number) => (
              <tr key={`row-${indexRow}`}>
                {fields.map(({ valueKey }, indexField: number) => {
                  return (
                    <StyledTableCell key={`cell-${indexRow}-${indexField}`}>
                      {dataRow[valueKey] as ReactNode}
                    </StyledTableCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </Wrapper>
  );
};
