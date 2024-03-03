'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Poppins } from 'next/font/google';
import { FaInfoCircle } from 'react-icons/fa';

import { CepProps } from '@/dtos/CepProps';
import { Button } from '@/components/button';
import { pathfinderDataSchema } from '@/utils/pathfinder-data-schema';

const poppings = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

type pathfindersSchema = z.infer<typeof pathfinderDataSchema>;

export function Form() {
  const [cepInputValue, setCepInputValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<pathfindersSchema>(); // { resolver: zodResolver(pathfinderDataSchema) }

  async function validateCep() {
    const formatedCep = cepInputValue.replace('-', '');

    if (cepInputValue.length < 8) {
      return false;
    }

    const cepData: CepProps = await fetch(
      `https://viacep.com.br/ws/${formatedCep}/json/`
    ).then((response) => response.json());

    if (cepData.erro) {
      return false;
      // ativar a visibilidade do componente modal de cpf inválido
      // modal = componente que vai receber a mensagem como props
    } else {
      insertLocationData(cepData);
      return true;
    }
  }

  function handleChangeCep(value: string) {
    setCepInputValue((prevState) => value);
  }

  function insertLocationData(cepData: CepProps) {
    const { logradouro, complemento, bairro, localidade, uf } = cepData;

    // Usar useRef para setar as informações de localização em cada input

    console.log(logradouro, complemento, bairro, localidade, uf);
  }

  function handleSubmitData(data: pathfindersSchema) {
    window.print();
    // console.log(data);
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(handleSubmitData)}>
      <div className='flex flex-col lg:flex-row py-1'>
        <div className='w-auto lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='nome' className={`${poppings.className}`}>
            Nome<span className='text-red-600 font-normal ml-1'>*</span>
          </label>
          <input
            type='text'
            id='nome'
            {...register('nome', { required: 'Campo obrigatório' })}
            autoComplete='off'
          />
          {errors.nome?.message && (
            <p className='error-message'>{errors.nome?.message}</p>
          )}
        </div>

        <div className='flex flex-col mx-3 my-1'>
          <label htmlFor='dataNascimento' className={`${poppings.className}`}>
            Data de Nasc.
            <span className='text-red-600 font-normal ml-1'>*</span>
          </label>
          <input
            type='date'
            id='dataNascimento'
            {...register('dataNascimento', { required: 'Campo obrigatório' })}
          />
          {errors.dataNascimento?.message && (
            <p className='error-message'>{errors.dataNascimento?.message}</p>
          )}
        </div>

        <div className='flex flex-col mx-3 my-1'>
          <label htmlFor='sexo' className={`${poppings.className}`}>
            Sexo<span className='text-red-600 font-normal ml-1'>*</span>
          </label>
          <select
            id='sexo'
            {...register('sexo', {
              required: 'Selecione uma opção',
            })}
          >
            <option value=''>SELECIONE</option>
            <option value='Feminino'>Feminino</option>
            <option value='Masculino'>Masculino</option>
          </select>
          {errors.sexo?.message && (
            <p className='error-message'>{errors.sexo?.message}</p>
          )}
        </div>

        <div className='lg:w-auto flex flex-col mx-3 my-1'>
          <label htmlFor='estadoCivil' className={`${poppings.className}`}>
            Estado Civil
          </label>
          <select id='estadoCivil' {...register('estadoCivil')}>
            <option value=''>SELECIONE</option>
            <option value='Solteiro(a)'>Solteiro(a)</option>
            <option value='Casado(a)'>Casado(a)</option>
            <option value='Viúvo(a)'>Viúvo(a)</option>
            <option value='Divorciado(a)'>Divorciado(a)</option>
          </select>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row py-1'>
        <div className='flex flex-col mx-3 my-1'>
          <label htmlFor='rg' className={`${poppings.className}`}>
            RG
          </label>
          <input type='text' id='rg' {...register('rg')} autoComplete='off' />
        </div>
        <div className='lg:w-32 flex flex-col mx-3 my-1'>
          <label htmlFor='orgaoExpedidor' className={`${poppings.className}`}>
            Órgão Expedidor
          </label>
          <input
            type='text'
            id='orgaoExpedidor'
            {...register('orgaoExpedidor')}
            autoComplete='off'
          />
        </div>
        <div className='flex flex-col mx-3 my-1'>
          <label htmlFor='cpf' className={`${poppings.className}`}>
            CPF
          </label>
          <input
            type='text'
            id='cpf'
            {...register('cpf')}
            maxLength={14}
            placeholder='000.000.000-00'
            autoComplete='off'
          />
        </div>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label
            htmlFor='certidaoNascimento'
            className={`${poppings.className}`}
          >
            N° da Certidão de Nascimento
          </label>
          <input
            type='text'
            id='certidaoNascimento'
            {...register('certidaoNascimento')}
            autoComplete='off'
          />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row py-1'>
        <div className='lg:w-96 flex flex-col mx-3 my-1'>
          <label htmlFor='email' className={`${poppings.className}`}>
            E-mail
          </label>
          <input
            type='email'
            id='email'
            {...register('email')}
            autoComplete='off'
          />
        </div>

        <div className='flex flex-col mx-3 my-1'>
          <label htmlFor='telefone' className={`${poppings.className}`}>
            Telefone
          </label>
          <input
            type='tel'
            id='telefone'
            {...register('telefone')}
            maxLength={12}
            placeholder='00 0000-0000'
            autoComplete='off'
          />
        </div>

        <div className='flex flex-col mx-3 my-1'>
          <label htmlFor='celular' className={`${poppings.className}`}>
            Celular
          </label>
          <input
            type='tel'
            id='celular'
            {...register('celular')}
            maxLength={13}
            placeholder='00 00000-0000'
            autoComplete='off'
          />
        </div>

        <div className='flex items-center mx-3 my-1 mt-7'>
          <input
            type='checkbox'
            id='possuiWhatsapp'
            {...register('possuiWhatsapp')}
            className='mr-2'
          />
          <label
            htmlFor='possuiWhatsapp'
            className={`${poppings.className} mb-0`}
          >
            Possui WhatsApp?
          </label>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row py-1'>
        <div className='lg:w-40 flex flex-col mx-3 my-1'>
          <label htmlFor='cep' className={`${poppings.className}`}>
            CEP
          </label>
          <input
            type='text'
            id='cep'
            {...register('cep', {
              /* validate: async (value) => {
                return (await validateCep()) !== false || 'CEP inválido';
              },
              onChange(event) {
                handleChangeCep(event.target.value);
              },
              onBlur(event) {
                validateCep();
              }, */
            })}
            maxLength={9}
            placeholder='00000-000'
            autoComplete='off'
          />
          {errors.cep?.message && (
            <p className='error-message'>{errors.cep?.message}</p>
          )}
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='endereco' className={`${poppings.className}`}>
            Endereço
          </label>
          <input
            type='text'
            id='endereco'
            {...register('endereco')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='bairro' className={`${poppings.className}`}>
            Bairro
          </label>
          <input
            type='text'
            id='bairro'
            {...register('bairro')}
            autoComplete='off'
          />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row py-1'>
        <div className='lg:w-40 flex flex-col mx-3 my-1'>
          <label htmlFor='numero' className={`${poppings.className}`}>
            Número
          </label>
          <input
            type='text'
            id='numero'
            {...register('numero')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='complemento' className={`${poppings.className}`}>
            Complemento
          </label>
          <input
            type='text'
            id='complemento'
            {...register('complemento')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='cidade' className={`${poppings.className}`}>
            Cidade
          </label>
          <input
            type='text'
            id='cidade'
            {...register('cidade')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-20 flex flex-col mx-3 my-1'>
          <label htmlFor='uf' className={`${poppings.className}`}>
            UF
          </label>
          <input
            type='text'
            id='uf'
            {...register('uf')}
            maxLength={2}
            autoComplete='off'
          />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row py-1'>
        <div className='lg:w-96 flex flex-col mx-3 my-1'>
          <label htmlFor='nomeMae' className={`${poppings.className}`}>
            Mãe<span className='text-red-600 font-normal ml-1'>*</span>
          </label>
          <input
            type='text'
            id='nomeMae'
            {...register('nomeMae', { required: 'Campo obrigatório' })}
            autoCapitalize='off'
          />
          {errors.nomeMae?.message && (
            <p className='error-message'>{errors.nomeMae?.message}</p>
          )}
        </div>

        <div className='lg:w-72 flex flex-col mx-3 my-1'>
          <label htmlFor='cpfMae' className={`${poppings.className}`}>
            CPF da Mãe
          </label>
          <input
            type='text'
            id='cpfMae'
            {...register('cpfMae')}
            maxLength={14}
            placeholder='000.000.000-00'
            autoComplete='off'
          />
        </div>

        <div className='lg:w-52 flex flex-col mx-3 my-1'>
          <label htmlFor='celularMae' className={`${poppings.className}`}>
            Celular da Mãe
          </label>
          <input
            type='tel'
            id='celularMae'
            {...register('celularMae')}
            maxLength={13}
            placeholder='00 00000-0000'
            autoComplete='off'
          />
        </div>

        <div className='flex items-center mx-3 my-1 mt-7'>
          <input
            type='checkbox'
            id='possuiWhatsappMae'
            {...register('possuiWhatsappMae')}
            className='mr-2'
          />
          <label
            htmlFor='possuiWhatsappMae'
            className={`${poppings.className} mb-0`}
          >
            Possui WhatsApp?
          </label>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row py-1'>
        <div className='lg:w-96 flex flex-col mx-3 my-1'>
          <label htmlFor='nomePai' className={`${poppings.className}`}>
            Pai
          </label>
          <input
            type='text'
            id='nomePai'
            {...register('nomePai')}
            autoCapitalize='off'
          />
        </div>

        <div className='lg:w-72 flex flex-col mx-3 my-1'>
          <label htmlFor='cpfPai' className={`${poppings.className}`}>
            CPF da Pai
            <span className='ml-1 text-red-600 text-xs'>
              (preencher se não tiver o da mãe)
            </span>
          </label>
          <input
            type='text'
            id='cpfPai'
            {...register('cpfPai')}
            maxLength={14}
            placeholder='000.000.000-00'
            autoComplete='off'
          />
        </div>

        <div className='lg:w-52 flex flex-col mx-3 my-1'>
          <label htmlFor='celularPai' className={`${poppings.className}`}>
            Celular do Pai
          </label>
          <input
            type='tel'
            id='celularPai'
            {...register('celularPai')}
            maxLength={13}
            placeholder='00 00000-0000'
            autoComplete='off'
          />
        </div>

        <div className='flex items-center mx-3 my-1 mt-7'>
          <input
            type='checkbox'
            id='possuiWhatsappPai'
            {...register('possuiWhatsappPai')}
            className='mr-2'
          />
          <label
            htmlFor='possuiWhatsappPai'
            className={`${poppings.className} mb-0`}
          >
            Possui WhatsApp?
          </label>
        </div>
      </div>

      <div className='flex pt-1 flex-col lg:flex-row pb-4'>
        <div className='lg:w-60 flex flex-col mx-3 my-1'>
          <label htmlFor='tamanhoCamiseta' className={`${poppings.className}`}>
            Tamanho da Camiseta
          </label>
          <select id='tamanhoCamiseta' {...register('tamanhoCamiseta')}>
            <option value=''>SELECIONE</option>
            <option value='Adulto EXG'>Adulto EXG</option>
            <option value='Adulto G'>Adulto G</option>
            <option value='Adulto GG'>Adulto GG</option>
            <option value='Adulto M'>Adulto M</option>
            <option value='Adulto P'>Adulto P</option>
            <option value='Adulto PP'>Adulto PP</option>
            <option value='Adulto XG'>Adulto XG</option>
            <option value='Adulto XGG'>Adulto XGG</option>
            <option value='Adulto XXGG'>Adulto XXGG</option>
            <option value='Baby-look G'>Baby-look G</option>
            <option value='Baby-look GG'>Baby-look GG</option>
            <option value='Baby-look M'>Baby-look M</option>
            <option value='Baby-look P'>Baby-look P</option>
            <option value='Baby-look PP'>Baby-look PP</option>
            <option value='Babv-look XG'>Babv-look XG</option>
            <option value='Babv-look XGG'>Babv-look XGG</option>
            <option value='Baby-look XXGG'>Baby-look XXGG</option>
            <option value='Infantil 10'>Infantil 10</option>
            <option value='Infantil 12'>Infantil 12</option>
            <option value='Infantil 14'>Infantil 14</option>
            <option value='Infantil 16'>Infantil 16</option>
            <option value='Infantil 2'>Infantil 2</option>
            <option value='infantil 4'>infantil 4</option>
            <option value='Infantil 6'>Infantil 6</option>
            <option value='Infantil 8'>Infantil 8</option>
          </select>
        </div>

        <div className='lg:w-80 flex flex-col mx-3 my-1'>
          <label htmlFor='igreja' className={`${poppings.className}`}>
            Frequenta qual igreja?
          </label>
          <select id='igreja' {...register('igreja')}>
            <option value=''>SELECIONE</option>
            <option value='Adventista do Sétimo Dia'>
              Adventista do Sétimo Dia
            </option>
            <option value='Católica'>Católica</option>
            <option value='Assembléla de Deus'>Assembléla de Deus</option>
            <option value='Batista'>Batista</option>
            <option value='Universal do Reino de Deus'>
              Universal do Reino de Deus
            </option>
            <option value='Quadrangular'>Quadrangular</option>
            <option value='Cristã do Brasil'>Cristã do Brasil</option>
            <option value='Testemunha de jeová'>Testemunha de jeová</option>
            <option value='Luterana'>Luterana</option>
            <option value='Espírita'>Espírita</option>
            <option value='Judáica'>Judáica</option>
            <option value='Muçulmana'>Muçulmana</option>
            <option value='Budista'>Budista</option>
            <option value='Outra - evangélica'>Outra - evangélica</option>
            <option value='Outra'>Outra</option>
          </select>
        </div>

        <div className='flex items-center mx-3 my-1 mt-7'>
          <input
            type='checkbox'
            id='ehAdventistaBatizado'
            {...register('ehAdventistaBatizado')}
            className='mr-2'
          />
          <label
            htmlFor='ehAdventistaBatizado'
            className={`${poppings.className} mb-0`}
          >
            É membro batizado da Igreja Adventista do Sétimo Dia?
          </label>
        </div>
      </div>

      <hr className='ml-2' />

      <div className='m-4'>
        <span>
          <b className='text-red-600 text-sm'>
            Caso não tenha pai ou mãe, preencha o nome do responsável jurídico
          </b>
        </span>
      </div>

      <hr className='ml-2' />

      <div className='w-full flex flex-col lg:flex-row pt-4 pb-1'>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='nomeResponsavel' className={`${poppings.className}`}>
            Nome do responsável
          </label>
          <input
            type='text'
            id='nomeResponsavel'
            {...register('nomeResponsavel')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='cpfResponsavel' className={`${poppings.className}`}>
            CPF do responsável
          </label>
          <input
            type='text'
            id='cpfResponsavel'
            {...register('cpfResponsavel')}
            maxLength={14}
            placeholder='000.000.000-00'
            autoComplete='off'
          />
        </div>
      </div>

      <div className='w-full flex flex-col lg:flex-row py-1'>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label
            htmlFor='grauParentescoResponsavel'
            className={`${poppings.className}`}
          >
            Grau de parentesco
          </label>
          <input
            type='text'
            id='grauParentescoResponsavel'
            {...register('grauParentescoResponsavel')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='emailResposavel' className={`${poppings.className}`}>
            E-mail do responsável
          </label>
          <input
            type='email'
            id='emailResposavel'
            {...register('emailResposavel')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label
            htmlFor='celularResponsavel'
            className={`${poppings.className}`}
          >
            Celular do responsável
          </label>
          <input
            type='text'
            id='celularResponsavel'
            {...register('celularResponsavel')}
            maxLength={13}
            placeholder='00 00000-0000'
            autoComplete='off'
          />
        </div>
      </div>

      <h1 className='mt-2 mb-4 mx-4 text-red-500 text-3xl'>Ficha Médica</h1>

      <hr className='ml-2' />

      <div className='w-full flex flex-col lg:flex-row pt-4 pb-1'>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label
            htmlFor='contatoEmergencia'
            className={`${poppings.className}`}
          >
            Contato de emergência
          </label>
          <input
            type='text'
            id='contatoEmergencia'
            {...register('contatoEmergencia')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label
            htmlFor='grauParentescoEmergencia'
            className={`${poppings.className}`}
          >
            Grau de parentesco
          </label>
          <input
            type='text'
            id='grauParentescoEmergencia'
            {...register('grauParentescoEmergencia')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='foneEmergencia' className={`${poppings.className}`}>
            Fone
          </label>
          <input
            type='text'
            id='foneEmergencia'
            {...register('foneEmergencia')}
            maxLength={12}
            placeholder='00 00000-0000'
            autoComplete='off'
          />
        </div>
      </div>

      <div className='w-full flex flex-col lg:flex-row py-2'>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='planoSaude' className={`${poppings.className}`}>
            Plano de Saúde
          </label>
          <input
            type='text'
            id='planoSaude'
            {...register('planoSaude')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='numeroPlanoSaude' className={`${poppings.className}`}>
            N° do Plano
          </label>
          <input
            type='text'
            id='numeroPlanoSaude'
            {...register('numeroPlanoSaude')}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='numeroSus' className={`${poppings.className}`}>
            N° da Carteira SUS
          </label>
          <input
            type='text'
            id='numeroSus'
            {...register('numeroSus')}
            autoComplete='off'
          />
        </div>
      </div>

      <div className='w-full flex flex-col lg:flex-row pt-2 pb-4'>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='dataVacinaTetano' className={`${poppings.className}`}>
            Última vacina antitetânica
          </label>
          <input
            type='date'
            id='dataVacinaTetano'
            {...register('dataVacinaTetano')}
          />
        </div>

        <div className='lg:w-28 flex flex-col mx-3 my-1'>
          <label htmlFor='altura' className={`${poppings.className}`}>
            Altura(m)
          </label>
          <input
            type='text'
            id='altura'
            {...register('altura')}
            placeholder='ex: 1.75'
          />
        </div>

        <div className='lg:w-28 flex flex-col mx-3 my-1'>
          <label htmlFor='peso' className={`${poppings.className}`}>
            Peso(kg)
          </label>
          <input
            type='text'
            id='peso'
            {...register('peso')}
            placeholder='ex: 65.0'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='tipoSanguineo' className={`${poppings.className}`}>
            Tipo Sanguíneo/RH
          </label>
          <select id='tipoSanguineo' {...register('tipoSanguineo')}>
            <option value=''>SELECIONE</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='NÃO SABE'>NÃO SABE</option>
          </select>
        </div>

        <div className='lg:w-full flex items-center mx-3 mb-1 mt-7'>
          <input
            type='checkbox'
            id='sabeNadar'
            {...register('sabeNadar')}
            className='mr-2'
          />
          <label htmlFor='sabeNadar' className={`${poppings.className} mb-0`}>
            Sabe nadar?
          </label>
        </div>
      </div>

      <hr className='ml-2' />

      <div className='w-full flex flex-col lg:flex-row gap-0 lg:gap-40 py-6'>
        <div className='flex flex-col mx-3'>
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='possuiEnfermidade'
              {...register('possuiEnfermidade')}
              className='mr-2'
            />
            <label
              htmlFor='possuiEnfermidade'
              className={`${poppings.className} mb-0`}
            >
              Sofre de alguma enfermidade?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='tomaRemedio'
              {...register('tomaRemedio')}
              className='mr-2'
            />
            <label
              htmlFor='tomaRemedio'
              className={`${poppings.className} mb-0`}
            >
              Toma algum remédio?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='temAlergiaRemedio'
              {...register('temAlergiaRemedio')}
              className='mr-2'
            />
            <label
              htmlFor='temAlergiaRemedio'
              className={`${poppings.className} mb-0`}
            >
              Tem alergia a algum medicamento?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='temOutraAlergia'
              {...register('temOutraAlergia')}
              className='mr-2'
            />
            <label
              htmlFor='temOutraAlergia'
              className={`${poppings.className} mb-0`}
            >
              Tem outro tipo de alergia?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='temProblemasPsicologicos'
              {...register('temProblemasPsicologicos')}
              className='mr-2'
            />
            <label
              htmlFor='temProblemasPsicologicos'
              className={`${poppings.className} mb-0`}
            >
              Possui Problemas Psicológicos?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='teveFraturaRecente'
              {...register('teveFraturaRecente')}
              className='mr-2'
            />
            <label
              htmlFor='teveFraturaRecente'
              className={`${poppings.className} mb-0`}
            >
              Algum tipo de fratura recente?
            </label>
          </div>
        </div>

        <div className='flex flex-col mx-3'>
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='temRestricaoAlimentar'
              {...register('temRestricaoAlimentar')}
              className='mr-2'
            />
            <label
              htmlFor='temRestricaoAlimentar'
              className={`${poppings.className} mb-0`}
            >
              Alguma restrição alimentar?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='temProblemasCardiacos'
              {...register('temProblemasCardiacos')}
              className='mr-2'
            />
            <label
              htmlFor='temProblemasCardiacos'
              className={`${poppings.className} mb-0`}
            >
              Possui problemas Cardíacos?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='ehDiabetico'
              {...register('ehDiabetico')}
              className='mr-2'
            />
            <label
              htmlFor='ehDiabetico'
              className={`${poppings.className} mb-0`}
            >
              É Diabético?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='temProblemasRenais'
              {...register('temProblemasRenais')}
              className='mr-2'
            />
            <label
              htmlFor='temProblemasRenais'
              className={`${poppings.className} mb-0`}
            >
              Possui Problemas Renais?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='teveProblemasDeSaudeRecentes'
              {...register('teveProblemasDeSaudeRecentes')}
              className='mr-2'
            />
            <label
              htmlFor='teveProblemasDeSaudeRecentes'
              className={`${poppings.className} mb-0`}
            >
              Problemas de Saúde Recente?
            </label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='fezTransfusaoDeSangue'
              {...register('fezTransfusaoDeSangue')}
              className='mr-2'
            />
            <label
              htmlFor='fezTransfusaoDeSangue'
              className={`${poppings.className} mb-0`}
            >
              Já fez transfusão de Sangue
            </label>
          </div>
        </div>
      </div>

      <hr className='ml-2' />

      <div className='w-full flex flex-col lg:flex-row justify-around py-4 gap-2'>
        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label
            htmlFor='medicamentosUsadosRecentemente'
            className={`${poppings.className}`}
          >
            Medicamentos usados recentemente (ano vigente)
          </label>
          <textarea
            id='medicamentosUsadosRecentemente'
            {...register('medicamentosUsadosRecentemente')}
            className='h-auto'
            rows={4}
            autoComplete='off'
          />
        </div>

        <div className='lg:w-full flex flex-col mx-3 my-1'>
          <label htmlFor='observacoes' className={`${poppings.className}`}>
            Observações
          </label>
          <textarea
            id='observacoes'
            {...register('observacoes')}
            className='h-auto'
            rows={4}
            autoComplete='off'
          />
        </div>
      </div>

      <hr className='ml-2' />

      <h2 className='mt-4 mb-2 mx-2 text-stone-700 font-bold text-3xl'>
        Enfermidades
      </h2>

      <div className='w-full flex flex-col lg:flex-row gap-0 lg:gap-20 my-6'>
        <div className='flex flex-col mx-3'>
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveCatapora'
              {...register('teveCatapora')}
              className='mr-2'
            />
            <label
              htmlFor='teveCatapora'
              className={`${poppings.className} mb-0`}
            >
              Já teve Catapora
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveRubeola'
              {...register('teveRubeola')}
            />
            <label
              htmlFor='teveRubeola'
              className={`${poppings.className} ml-2 mr-1 mb-0`}
            >
              Já teve Rubéola
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='A rubéola ou “sarampo alemão” é uma virose contagiosa que provoca febre e erupções vermelhas na pele. Também chamadas de rash, as manchas costumam surgir na face e atrás da orelha, antes de se espalharem pelo corpo todo.'
            />
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveFebreAmarela'
              {...register('teveFebreAmarela')}
              className='mr-2'
            />
            <label
              htmlFor='teveFebreAmarela'
              className={`${poppings.className} mb-0`}
            >
              Já teve Febre Amarela
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveTetano'
              {...register('teveTetano')}
              className='mr-2'
            />
            <label
              htmlFor='teveTetano'
              className={`${poppings.className} mb-0`}
            >
              Já teve Tétano
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveCaxumba'
              {...register('teveCaxumba')}
              className='mr-2'
            />
            <label
              htmlFor='teveCaxumba'
              className={`${poppings.className} mb-0`}
            >
              Já teve Caxumba
            </label>
          </div>
        </div>

        <div className='flex flex-col mx-3'>
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveMenigite'
              {...register('teveMenigite')}
            />
            <label
              htmlFor='teveMenigite'
              className={`${poppings.className} ml-2 mr-1 mb-0`}
            >
              Já teve Meningite
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='Inflamação das membranas que revestem o cérebro e a medula espinhal, geralmente causada por uma infecção.'
            />
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveBronquite'
              {...register('teveBronquite')}
              className='mr-2'
            />
            <label
              htmlFor='teveBronquite'
              className={`${poppings.className} mb-0`}
            >
              Já teve Bronquite
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveH1n1'
              {...register('teveH1n1')}
              className='mr-2'
            />
            <label htmlFor='teveH1n1' className={`${poppings.className} mb-0`}>
              Já teve H1N1
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveVariola'
              {...register('teveVariola')}
            />
            <label
              htmlFor='teveVariola'
              className={`${poppings.className} ml-2 mr-1 mb-0`}
            >
              Já teve Varíola
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='A varíola é uma doença infecciosa, contagiosa e grave. É causada por um vírus conhecido como Orthopoxvirus variolae.'
            />
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveCovid'
              {...register('teveCovid')}
              className='mr-2'
            />
            <label htmlFor='teveCovid' className={`${poppings.className} mb-0`}>
              Já teve Covid-19
            </label>
          </div>
        </div>

        <div className='flex flex-col mx-3'>
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='tevePneumonia'
              {...register('tevePneumonia')}
              className='mr-2'
            />
            <label
              htmlFor='tevePneumonia'
              className={`${poppings.className} mb-0`}
            >
              Já teve Pneumonia
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveDengue'
              {...register('teveDengue')}
              className='mr-2'
            />
            <label
              htmlFor='teveDengue'
              className={`${poppings.className} mb-0`}
            >
              Já teve Dengue
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveSarampo'
              {...register('teveSarampo')}
              className='mr-2'
            />
            <label
              htmlFor='teveSarampo'
              className={`${poppings.className} mb-0`}
            >
              Já teve Sarampo
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveCoqueluche'
              {...register('teveCoqueluche')}
            />
            <label
              htmlFor='teveCoqueluche'
              className={`${poppings.className} ml-2 mr-1 mb-0`}
            >
              Já teve Coqueluche
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='A coqueluche é também conhecida como “Pertussis” (devido ao nome da bactéria causadora), “tosse comprida” ou “tosse convulsa”. É uma doença infecciosa aguda e transmissível, responsável por acometer o aparelho respiratório (traquéia e brônquios).'
            />
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveRinite'
              {...register('teveRinite')}
            />
            <label
              htmlFor='teveRinite'
              className={`${poppings.className} ml-2 mr-1 mb-0`}
            >
              Já teve ou tem Rinite
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='Conhecida popularmente como “alergia nasal”, a Rinite alérgica é uma reação imunológica do corpo à partículas inaladas que são consideradas estranhas.'
            />
          </div>
        </div>

        <div className='flex flex-col mx-3'>
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveColera'
              {...register('teveColera')}
            />
            <label
              htmlFor='teveColera'
              className={`${poppings.className} mr-2 ml-1 mb-0`}
            >
              Já teve Cólera
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='A cólera é uma infecção intestinal causada pela Vibrio cholerae, bactéria que costuma viver na água. Seus principais sintomas são diarreia e vômitos que podem levar à desidratação.'
            />
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveMalaria'
              {...register('teveMalaria')}
              className='mr-2'
            />
            <label
              htmlFor='teveMalaria'
              className={`${poppings.className} mb-0`}
            >
              Já teve Malária
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveHepatite'
              {...register('teveHepatite')}
              className='mr-2'
            />
            <label
              htmlFor='teveHepatite'
              className={`${poppings.className} mb-0`}
            >
              Já teve Hepatite
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='teveDifteria'
              {...register('teveDifteria')}
            />
            <label
              htmlFor='teveDifteria'
              className={`${poppings.className} ml-2 mr-1 mb-0`}
            >
              Já teve Difteria
            </label>
            <FaInfoCircle
              className='text-sky-600'
              title='Conhecida popularmente como “alergia nasal”, a Rinite alérgica é uma reação imunológica do corpo à partículas inaladas que são consideradas estranhas. '
            />
          </div>
        </div>
      </div>

      <hr className='ml-2' />

      <h2 className='mt-4 mb-2 mx-2 text-stone-700 font-bold text-3xl'>
        Portador de Necessidades Especiais
      </h2>

      <div
        title='Necessidades Especiais'
        className='lg:w-full flex flex-col px-3 pt-6 pb-4'
      >
        <div className='w-full flex flex-col lg:flex-row gap-0 lg:gap-32 mb-5'>
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='ehDeficienteAuditivo'
              {...register('ehDeficienteAuditivo')}
              className='mr-2'
            />
            <label
              htmlFor='ehDeficienteAuditivo'
              className={`${poppings.className} mb-0`}
            >
              Deficiente Auditivo
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='ehDeficienteVisual'
              {...register('ehDeficienteVisual')}
              className='mr-2'
            />
            <label
              htmlFor='ehDeficienteVisual'
              className={`${poppings.className} mb-0`}
            >
              Deficiente Visual
            </label>
          </div>

          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='ehDeficienteFisico'
              {...register('ehDeficienteFisico')}
              className='mr-2'
            />
            <label
              htmlFor='ehDeficienteFisico'
              className={`${poppings.className} mb-0`}
            >
              Deficiente Físico (cadeirante)
            </label>
          </div>
        </div>

        <div className='w-full flex flex-col'>
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='termosDeUso'
              {...register('termosDeUso', {
                required: 'Aceite os termos de uso',
              })}
              className='mr-2'
            />
            <label
              htmlFor='termosDeUso'
              className={`${poppings.className} mb-0`}
            >
              {
                'Ao clicar em "Enviar" você automaticamente estará aceitando os termos de uso.'
              }
            </label>
          </div>
          {errors.termosDeUso?.message && (
            <p className='error-message'>{errors.termosDeUso?.message}</p>
          )}
        </div>
      </div>

      <div className='lg:w-full flex gap-5 p-6'>
        <Button.Clean type='reset'>LIMPAR</Button.Clean>
        <Button.Send type='submit'>ENVIAR</Button.Send>
      </div>
    </form>
  );
}
