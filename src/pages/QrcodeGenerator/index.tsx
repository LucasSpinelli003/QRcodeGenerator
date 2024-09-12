import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import QRCode from 'react-qr-code';
import { postUser } from '../../service/user/post-user';

export default function QrcodeGenerator() {
  const MyFormItemContext = React.createContext<(string | number)[]>([]);

  interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
  }

  function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }

  const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({
    prefix,
    children,
  }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
  };

  const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
  };

  const [qrCode, setQRCode] = useState<string | null>(null);

  const onFinish = async (values: { user: { name: string; email: string; cpf: string } }) => {
    const {user} = values
    await postUser({cpf: user.cpf, email: user.email, name: user.name}).then((e) =>{
      setQRCode(e.data.id);
    })
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
        <MyFormItemGroup prefix={['user']}>
          <MyFormItem name="name" label="Nome completo:" required={true}>
            <Input />
          </MyFormItem>
          <MyFormItem name="email" label="Email:" required={true}>
            <Input />
          </MyFormItem>
          <MyFormItem name="cpf" label="CPF:" required={true}>
            <Input />
          </MyFormItem>
        </MyFormItemGroup>

        <Button type="primary" htmlType="submit">
          Gerar QRcode
        </Button>
      </Form>

      {qrCode ? <QRCode value={qrCode} /> : <></>}
    </div>
  );
}
