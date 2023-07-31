import * as moment from 'moment';

export default function validateProductFields(product: any): string | null {
  const errors: string[] = [];

  // Verifica se o campo data_preco é uma data válida
  if (!moment(product.data_preco, 'YYYY-MM-DD', true).isValid()) {
    errors.push(
      `O campo data_preco do objeto com a chave ${product.key} deve estar no formato "YYYY-MM-DD".`,
    );
  }

  // Verifica se o campo cod_produto é um número válido
  if (typeof product.cod_produto !== 'number' || isNaN(product.cod_produto)) {
    errors.push(
      `O campo cod_produto do objeto com a chave ${product.key} deve ser um número válido.`,
    );
  }

  // Verifica se o campo sku é uma string com no máximo 20 caracteres
  if (typeof product.sku !== 'string') {
    errors.push(
      `O campo sku do objeto com a chave ${product.key} deve ser uma string.`,
    );
  }

  // Verifica se o campo qtd_estoque é um número válido
  if (typeof product.qtd_estoque !== 'number' || isNaN(product.qtd_estoque)) {
    errors.push(
      `O campo qtd_estoque do objeto com a chave ${product.key} deve ser um número válido.`,
    );
  }

  // Verifica se o campo desconto é um número válido
  if (typeof product.desconto !== 'number' || isNaN(product.desconto)) {
    errors.push(
      `O campo desconto do objeto com a chave ${product.key} deve ser um número válido.`,
    );
  }

  // Verifica se o campo data_hora_insercao é uma data e hora válidas
  if (
    !moment(product.data_hora_insercao, 'YYYY-MM-DD HH:mm:ss', true).isValid()
  ) {
    errors.push(
      `O campo data_hora_insercao do objeto com a chave ${product.key} deve estar no formato "YYYY-MM-DD HH:mm:ss".`,
    );
  }

  // Verifica se o campo data_inicio é uma data válida
  if (!moment(product.data_inicio, 'YYYY-MM-DD', true).isValid()) {
    errors.push(
      `O campo data_inicio do objeto com a chave ${product.key} deve estar no formato "YYYY-MM-DD".`,
    );
  }

  // Verifica se o campo data_fim é uma data válida
  if (!moment(product.data_fim, 'YYYY-MM-DD', true).isValid()) {
    errors.push(
      `O campo data_fim do objeto com a chave ${product.key} deve estar no formato "YYYY-MM-DD".`,
    );
  }

  return errors.length > 0 ? errors.join('\n') : null;
}
