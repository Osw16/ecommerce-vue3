app.component("product",{
    template:/*vue-html*/`
    <section class="product">
    <div class="product__thumbnails">
      <div v-for="(image,index) in product.images" 
      key="image.thumbnail" 
      class="thumb" 
      :class="{active:activeImage == index }" 
      :style="{backgroundImage:'url('+ product.images[index].thumbnail + ')'}"
      @click="activeImage = index"
      ></div>
    </div>
    <div class="product__image">
      <img :src="product.images[activeImage].image" :alt="product.name" />
    </div>
  </section>
  <section class="description">
    <h4>{{product.name.toUpperCase()}}{{product.stock == 0 ? "🤔":"😉"}}</h4>
    <badge :product="product"></badge>
    <p class="description__status" v-if="product.stock == 3">Quedan pocas unidades!</p>
    <p class="description__status" v-else-if="product.stock == 2">Quedan 2 unidades!</p>
    <p class="description__status" v-else-if="product.stock == 1">SE AGOTA!</p>
    <p class="description__price" :style="{color: price_color}">$ {{new Intl.NumberFormat("es-CO").format(product.price)}}</p>
    <p class="description__content">

    </p>
    <div class="discount">
      <span>Codigo de Descuento:</span>
      <input 
      type="text" 
      placeholder="Ingresa tu codigo" 
      @keyup.enter="applyDiscount($event)"
      />
    </div>
    <button :disabled="product.stock == 0" @click="sendToCart()">Agregar al carrito</button>
  </section>
    
    `,
    props:["product"],
    emits:["sendtocart"],
    setup(props,context){
        const productState= reactive({
            activeImage:0,
            price_color:computed(()=>props.product.stock <= 1 ? "rgb(188 30 67)" : "rgb(104, 104, 209)"
            )
          });

            filteredProducts = computed(() => {
              if (filtro.value != "") {
                return products.value.filter((product) =>
                product.name.toUpperCase().includes(filtro.value.toUpperCase())
                );
              }
                return products.value;
              });

          function sendToCart(){
            context.emit("sendtocart",props.product);
          }
          const discountCodes = ref(["CODE3","CODE4"]);
          function applyDiscount(event){
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
            if(discountCodeIndex >=0){
              props.product.price *= 50/100;
              discountCodes.value.splice(discountCodeIndex,1);
            }
          }

          watch(()=>productState.activeImage,(val, oldValue)=>{
            console.log(val,oldValue)
          });

          // watch(()=>props.product.stock,stock=>{ 
          //     if(stock<=1){productState.price_color = "rgb(188 30 67)"; }
          //   }
          // );

          return{
              ...toRefs(productState),
              applyDiscount,
              sendToCart
          }
    }
})