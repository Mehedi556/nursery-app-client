import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode } from "react"
import AddCategoryModal from "./AddCategoryModal"
import { TCategory } from "@/types/category";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Edit, Settings, Trash2 } from "lucide-react";
import DeleteCategoryModal from "./DeleteCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";

const ManageCategoriesModal = ({children}: {children: ReactNode}) => {

  const { data } = useGetAllCategoriesQuery(undefined);
  return (
    <Dialog>
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[50%] max-h-[90%] overflow-y-scroll">
      <DialogHeader>
        <div className="flex justify-between items-center m-1">
            <div className="text-left">
                <DialogTitle className="text-lg sm:text-xl">Manage Categories</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                You can add, update and delete categories from here.
                </DialogDescription>
            </div>
            <div className="">
              <AddCategoryModal>
                <button className="text-black bg-color-primary hover:bg-color-simple text-xs sm:text-md py-1.5 sm:py-3 px-3 sm:px-5 rounded-sm" type="button">
                    Add Category
                </button>
              </AddCategoryModal>
                
            </div>
        </div>
      </DialogHeader>
      <div className="flex items-center space-x-2">
      <Table>
        <TableCaption>Recent added categories.</TableCaption>
        <TableHeader className="text-xs sm:text-sm">
          <TableRow>
            <TableHead className="text-left p-0 font-bold text-black">Category</TableHead>
            <TableHead className=" p-0 pl-1 sm:pl-3 font-bold text-black">Title</TableHead>
            <TableHead className=" p-0 font-bold text-black">Heading</TableHead>
            <TableHead className=" p-0 font-bold text-black">Description</TableHead>
            <TableHead className="p-0 text-right font-bold text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs sm:text-sm">
          {
            data?.data?.map(( item: TCategory ) => (
              <TableRow className="mb-6" key={item?._id}>
                <TableCell className="font-medium p-0">
                  <img className="h-14 sm:h-24 w-14 sm:w-24 object-cover object-center" src={item?.imageUrl} alt="" />
                </TableCell>
                <TableCell className="p-0 pl-1 sm:pl-3 text-zinc-600">{item?.title.substring(0, 15)}</TableCell>
                <TableCell className="p-0 text-zinc-600">{item?.heading.substring(0, 20)}</TableCell>
                <TableCell className="p-0 text-zinc-600">{item?.description.substring(0, 30)}</TableCell>
                <TableCell className="">
                  <div className="flex justify-end">
                    <Popover>
                      <PopoverTrigger>
                        <Settings color="#AED581" className="cursor-pointer h-4 sm:h-6 w-4 sm:w-6"/>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px]">
                      <h1 className="font-bold text-sm border-b pb-2">
                          Actions
                        </h1>
                        <div className="mt-2">
                          <UpdateCategoryModal category={item}>
                            <button className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 w-full rounded">
                              <Edit size={16} />
                              <p>Update</p>
                            </button>
                          </UpdateCategoryModal>

                          <DeleteCategoryModal _id={item?._id as string}>
                            <button className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 w-full rounded">
                              <Trash2 className="text-red-600" size={16} />
                              <p>Delete</p>
                            </button>
                          </DeleteCategoryModal>

                        </div>
                      </PopoverContent>
                    </Popover>

                  </div>
                </TableCell>
              </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <div>
            <Button type="button" className="text-white bg-red-500 hover:bg-red-600 text-sm rounded-sm">Close
          </Button>
          </div>
          
            
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ManageCategoriesModal