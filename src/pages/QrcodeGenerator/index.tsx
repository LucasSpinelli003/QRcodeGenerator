import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import QRCode from 'react-qr-code';



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
  const [qrCode, setQRCode] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const onFinish = (value: object) => {
    console.log(value);
    setQRCode('www.seadecon.com.br')
  };


  return (
    <div style={{display:'flex', flexDirection:'column', gap: '3rem'}}>
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItemGroup prefix={['user']}>
          <MyFormItem name="completeName" label="Nome completo:" required={true}>
            <Input onChange={(e)=> setName(e.target.value)} value={name}/>
          </MyFormItem>
        <MyFormItem name="email" label="Email:" required={true}>
            <Input onChange={(e)=> setEmail(e.target.value)} value={email}/>
          </MyFormItem>
        <MyFormItem name="cpf" label="cpf:" required={true}>
          <Input onChange={(e)=> setCpf(e.target.value)} value={cpf}/>
        </MyFormItem>
      </MyFormItemGroup>

      <Button type="primary" htmlType="submit" disabled={!name || !email || !cpf}>
        Gerar QRcode
      </Button>
    </Form>

    {qrCode ? < QRCode value={qrCode}/> : <></>}
    </div>
  );
};