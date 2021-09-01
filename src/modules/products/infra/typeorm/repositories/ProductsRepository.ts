import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    // TODO
    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    // TODO
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }
  /** products: IFindProducts[]- array de objeto produtos/contém os produtos */
  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // TODO 
    /** para pegar os ids do produtos passados como parâmetros para esse método */
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        /**In- método para verificar se o Array de ProductIds- existe algum com o
         * mesmo "id" no banco */
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  /** Método para atualizar a quantidade do produto */
  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // TODO
    /**não altera só a quantidade do produto, o ideia seria alterar/atualizar somente quantidade */
    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;
