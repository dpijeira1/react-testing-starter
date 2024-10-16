import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantitySelector from "../../src/components/QuantitySelector";
import { Product } from "../../src/entities";
import { CartProvider } from "../../src/providers/CartProvider";

//Testing State Management (React Context)
//QuantitySelector uses a hook called useCart()
//Extracting repetitive calls to functions returned by renderComponent()
describe("QuantitySelector", () => {
  const renderComponent = () => {
    const product: Product = {
      id: 1,
      name: "Product 1",
      price: 10,
      categoryId: 1,
    };

    render(
      <CartProvider>
        <QuantitySelector product={product} />
      </CartProvider>
    );

    const getAddToCartButton = () =>
      screen.queryByRole("button", { name: /add to cart/i });

    const getQuantityControls = () => ({
      quantity: screen.queryByRole("status"),
      decrementButton: screen.queryByRole("button", { name: "-" }),
      incrementButton: screen.queryByRole("button", { name: "+" }),
    });
    const user = userEvent.setup();

    const addToCart = async () => {
      const button = getAddToCartButton();
      await user.click(button!);
    };

    const incrementQuantity = async () => {
      const { incrementButton } = getQuantityControls();
      await user.click(incrementButton!);
    };

    const decrementQuantity = async () => {
      const { decrementButton } = getQuantityControls();
      await user.click(decrementButton!);
    };

    return {
      addToCart,
      getQuantityControls,
      getAddToCartButton,
      incrementQuantity,
      decrementQuantity,
    };
  };
  it("should render add to cart button", () => {
    const { getAddToCartButton } = renderComponent();
    expect(getAddToCartButton()).toBeInTheDocument();
  });

  it("should add the product to the cart", async () => {
    const { getAddToCartButton, addToCart, getQuantityControls } =
      renderComponent();

    await addToCart();

    const { quantity, incrementButton, decrementButton } =
      getQuantityControls();

    expect(quantity).toHaveTextContent("1");
    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();

    expect(getAddToCartButton()).not.toBeInTheDocument();
  });

  it("should increment the quantity", async () => {
    const { addToCart, getQuantityControls, incrementQuantity } =
      renderComponent();
    await addToCart();

    const { quantity } = getQuantityControls();
    await incrementQuantity();
    expect(quantity).toHaveTextContent("2");
  });
  it("should decrement the quantity", async () => {
    const {
      incrementQuantity,
      decrementQuantity,
      addToCart,
      getQuantityControls,
    } = renderComponent();
    await addToCart();
    const { quantity } = getQuantityControls();
    await incrementQuantity();

    await decrementQuantity();

    expect(quantity).toHaveTextContent("1");
  });

  it("should remove the product from the cart", async () => {
    const {
      addToCart,
      getQuantityControls,
      getAddToCartButton,
      decrementQuantity,
    } = renderComponent();
    await addToCart();

    await decrementQuantity();

    const { quantity, decrementButton, incrementButton } =
      getQuantityControls();
    expect(quantity).not.toBeInTheDocument();
    expect(decrementButton).not.toBeInTheDocument();
    expect(incrementButton).not.toBeInTheDocument();
    expect(getAddToCartButton()).toBeInTheDocument();
  });
});
