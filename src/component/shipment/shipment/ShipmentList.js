import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";
import {authGet} from "../../../api";
import {tableIcons} from "../../../utils/iconutil";
import React, {useState} from "react";
import Upload from "../../../utils/Upload";

export default function ShipmentList() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const columns = [
    {title: "Shipment Id", field: "shipmentId"},
    {title: "Shipment Type Id", field: "shipmentTypeId"},
    {title: "Number Shipment Items", field: "numberShipmentItems"},
  ];

  return <div>
    <MaterialTable
      title="Danh sách đơn hàng vận chuyển"
      columns={columns}
      options={{
        search: false
      }}
      data={query =>
        new Promise((resolve) => {
          console.log(query);
          let sortParam = "";
          if (query.orderBy !== undefined) {
            sortParam = "&sort=" + query.orderBy.field + ',' + query.orderDirection;
          }
          authGet(
            dispatch,
            token,
            "/shipment" + "?size=" + query.pageSize + "&page=" + query.page + sortParam
          ).then(
            response => {
              resolve({
                data: response.content,
                page: response.number,
                totalCount: response.totalElements
              });
            },
            error => {
              console.log("error");
            }
          );
        })
      }
      icons={tableIcons}

    />
    <Upload
      url={'shipment/upload'}
      token={token}
      dispatch={dispatch}
      buttonTitle={'Tải lên đơn hàng'}
      handleSaveCallback={null}
    />
  </div>
}