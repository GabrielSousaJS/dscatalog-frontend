import { Product } from '../../../../types/product';
import './styles.css';
import { requestBackend } from '../../../../util/requests';
import { AxiosRequestConfig } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Category } from '../../../../types/category';
import FormInput from '../../../../components/FormInput';
import {
  dirtyAndValidate,
  dirtyAndValidateAll,
  hasAnyInvalid,
  setBackendErrors,
  toValues,
  updateAll,
  updateAndValidate,
} from '../../../../util/forms';
import FormTextArea from '../../../../components/FormTextArea';
import FormSelect from '../../../../components/FormSelect';
import { selectStyles } from '../../../../util/select';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const navigate = useNavigate();

  // Nova versão ************************************************************************************************************************************************************
  const [formData, setFormData] = useState<any>({
    name: {
      value: '',
      id: 'name',
      name: 'name',
      type: 'text',
      placeholder: 'Nome do produto',
      validation: function (value: string) {
        return /^.{3,80}$/.test(value);
      },
      message: 'Informe um nome entre 3 a 80 caracteres',
    },
    price: {
      value: '',
      id: 'price',
      name: 'price',
      type: 'number',
      placeholder: 'Preço do produto',
      validation: function (value: any) {
        return Number(value) > 0;
      },
      message: 'Informar um valor positivo',
    },
    description: {
      value: '',
      id: 'description',
      name: 'description',
      type: 'text',
      placeholder: 'Descrição',
      validation: function (value: string) {
        return /^.{10,}$/.test(value);
      },
      message: 'A descrição ao menos 10 caracteres',
    },
    imgUrl: {
      value: '',
      id: 'imgUrl',
      name: 'imgUrl',
      type: 'text',
      placeholder: 'Imagem',
    },
    categories: {
      value: [],
      id: 'categories',
      name: 'categories',
      placeholder: 'Categorias',
      validation: function (value: Category[]) {
        return value.length > 0;
      },
      message: 'Selecione uma categoria',
    },
  });

  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    requestBackend({
      url: '/categories',
    }).then((response) => {
      setCategories(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        setFormData(updateAll(formData, response.data));
      });
    }
  }, [productId]);

  function handleInputChange(event: any) {
    setFormData(
      updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  const handleCancel = () => {
    navigate('/admin/products');
  };

  function handleTurnDirty(name: string) {
    setFormData(dirtyAndValidate(formData, name));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const formDataValidated = dirtyAndValidateAll(formData);
    if (hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = toValues(formData);

    if (isEditing) {
      const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/products/${productId}`,
        withCredentials: true,
        data: requestBody,
      };

      return requestBackend(config).then(() => {
        navigate('/admin/products');
      }).catch(error => {
        const newInputs = setBackendErrors(formData, error.response.data.erros);
        setFormData(newInputs);
      });
    } else {
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/products',
        withCredentials: true,
        data: requestBody,
      };

      return requestBackend(config).then(() => {
        navigate('/admin/products');
      })
      .catch(error => {
        console.log(error)
        const newInputs = setBackendErrors(formData, error.response.data.erros);
        setFormData(newInputs);
      });
    }
  }

  return (
    <div className="">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <FormInput
                  {...formData.name}
                  className="form-control base-input dsc-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error">{formData.name.message}</div>
              </div>

              <div className="margin-bottom-30">
                <FormSelect
                  {...formData.categories}
                  styles={selectStyles}
                  className="dsc-form-control dsc-form-select-container"
                  options={categories}
                  isMulti
                  onChange={(obj: any) => {
                    const newFormData = updateAndValidate(
                      formData,
                      'categories',
                      obj
                    );
                    setFormData(newFormData);
                  }}
                  onTurnDirty={handleTurnDirty}
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
                />
                <div className="dsc-form-error">
                  {formData.categories.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <FormInput
                  {...formData.price}
                  className="form-control base-input dsc-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error">{formData.price.message}</div>
              </div>
            </div>

            <div className="col-lg-6">
              <FormTextArea
                {...formData.description}
                className="form-control base-input product-crud-textarea dsc-form-control"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="dsc-form-error">
                {formData.description.message}
              </div>
            </div>
          </div>

          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
