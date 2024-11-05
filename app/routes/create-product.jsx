import {calculatePrice} from '~/lib/utils';

export async function action({request}) {
  console.log('action request');
  // console.log(request);
  // const formData = await request.formData();
  // const name = String(formData.get('name'));

  // console.log(name);

  console.log('handleCreateProductVariant');
  const data = await request.json();

  console.log('data');
  console.log(data);

  // Access the specific fields from the JSON object
  const {product, selectedVariant} = data;

  console.log('request');
  console.log(request);
  console.log(data);
  console.log(product);

  const extraOptions = [
    {
      key: 'Ringmaat',
      value: '43',
    },
    {
      key: 'Harskleur',
      value: 'Aqua',
    },
  ];
  const variantData = {
    product,
    extraOptions,
    selectedVariant,
  };

  console.log('variantData');
  console.log(variantData);
  const storeName = 'gedenk-sieraad-nl.myshopify.com';
  const ADMIN_TOKEN = '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';
  const method = 'POST';
  const apiVersion = '2023-10';

  const productIdParts = product.id.split('/');
  const productId = productIdParts[productIdParts.length - 1];

  const variants = product.variants.nodes;

  const imageIdParts = selectedVariant.image.id.split('/');
  const imageId = imageIdParts[imageIdParts.length - 1];

  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  const option1 =
    selectedVariant.selectedOptions[0].value +
    ' WD options ' +
    String(randomNumber);
  const option2 =
    selectedVariant.selectedOptions[1]?.value !== undefined
      ? selectedVariant.selectedOptions[1].value
      : null;
  const option3 =
    selectedVariant.selectedOptions[2]?.value !== undefined
      ? selectedVariant.selectedOptions[2].value
      : null;

  const price =
    parseFloat(selectedVariant.price.amount) +
    parseFloat(calculatePrice(extraOptions, OptionSets));

  console.log('price');
  console.log(price);

  const postBody = {
    variant: {
      product_id: productId,
      option1: option1,
      option2: option2,
      option3: option3,
      price: price,
      inventory_policy: 'continue',
      sku: selectedVariant.sku,
      image_id: imageId,
    },
  };

  console.log('postBody');
  console.log(postBody);

  const options = {
    method: method,
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  };

  const url = `https://${storeName}/admin/api/${apiVersion}/products/${postBody.variant.product_id}/variants.json`;

  //   return json({status: 200, message: 'success', newProductId: '12345'});
  return {newProductId: '12345'};
  //   return json({newProductId: '12345'});
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('create product response');
    console.log(data);
    return {status: 200, headers: {'Content-Type': 'application/json'}};
  } catch (error) {
    console.log(JSON.stringify({error: error.message}));
    return {status: 500, headers: {'Content-Type': 'application/json'}};
  }
}
