import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
} from "@heroui/react";
import { Spinner, Chip, Button } from "@heroui/react";

import type { OrderType } from "@/types/order";
// import type { MenuItem } from "@/types/menu";
// import type { CartItem } from "@/types/cart";
// type CartItemWithMenu = CartItem & MenuItem;

export const ModalDetailOrder = ({
  order,
  isDetailLoading,
  openModal,
  handleClose,
}: {
  order: OrderType;
  isDetailLoading: boolean;
  openModal: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal isOpen={openModal} size="lg" onClose={handleClose}>
      <ModalContent>
        <>
          <ModalHeader>
            {isDetailLoading ? "Loading..." : `Order #${order?.id}`}
          </ModalHeader>

          <ModalBody>
            {isDetailLoading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                  <div className="flex-1 ">
                    <div className="flex flex-col gap-1">
                      <h2>Customer :</h2>
                      <Chip color="default" variant="bordered">
                        {order?.customer_name}
                      </Chip>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2>Table :</h2>
                      <Chip color="default" variant="bordered">
                        {order?.table_number}
                      </Chip>
                    </div>
                  </div>
                  <div className="flex-1 ">
                    <div className="flex flex-col gap-1">
                      <h2>Status :</h2>
                      <Chip color="default" variant="bordered">
                        {order?.status}
                      </Chip>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2>Total :</h2>
                      <Chip color="default" variant="bordered">
                        ${order?.total}
                      </Chip>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Items</h3>

                  <div className="flex flex-col gap-3">
                    {order?.cart?.map((item, index) => (
                      <div
                        key={`${item.menuItem.id}-${index}`}
                        className="flex gap-3 p-3 rounded-md shadow-sm bg-gray-200"
                      >
                        <Image
                          src={item.menuItem.image_url}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />

                        <div>
                          <p className="font-semibold">{item.menuItem.name}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
