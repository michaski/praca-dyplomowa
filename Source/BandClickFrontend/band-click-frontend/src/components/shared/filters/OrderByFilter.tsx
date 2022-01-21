import React, { useState } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { OrderByValues } from "../../../models/Filters/QueryFilters";

interface OrderByFilterProps {
    onOrderByValueChange: Function
}

const OrderByFilter: React.FC<OrderByFilterProps> = ({onOrderByValueChange}) => {

    const [orderBy, setOrderBy] = useState(undefined as OrderByValues | undefined);

    const stringToOrderByValue = (valueToParse: string): OrderByValues | undefined => {
        switch (valueToParse) {
            case '1':
                return OrderByValues.NAME;
            case '2':
                return OrderByValues.AUTHOR;
            case '3':
                return OrderByValues.DATE;
            default:
                return undefined;
        }
    }

    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="4">
            Sortuj
        </Form.Label>
        <Col sm="8">
            <Form.Select id={'type-select'} aria-label="Rodzaj" value={orderBy} onChange={e => {
                const selectedValue = stringToOrderByValue(e.target.value);
                setOrderBy(selectedValue);
                onOrderByValueChange(selectedValue);
            }}>
                <option value={undefined}>Domyślnie</option>
                <option value={OrderByValues.NAME}>Nazwa</option>
                <option value={OrderByValues.AUTHOR}>Autor</option>
                <option value={OrderByValues.DATE}>Data</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default OrderByFilter;
