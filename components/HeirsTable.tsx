import { Heir } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeirsTableProps {
  heirs: Heir[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEdit: (heir: Heir) => void;
}

export function HeirsTable({ heirs, searchTerm, onSearchChange, onEdit }: HeirsTableProps) {
  return (
    <div className="w-full bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      {/* Search */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="relative max-w-xs">
          <label htmlFor="hs-table-search" className="sr-only">Search</label>
          <Input
            type="text"
            name="hs-table-search"
            id="hs-table-search"
            placeholder="Search heirs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
            <Search className="h-3.5 w-3.5 text-gray-400" />
          </div>
        </div>
      </div>
      {/* End Search */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className="bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Relation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Target %
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-neutral-900 dark:divide-neutral-700">
            {heirs.map((heir) => (
              <tr key={heir.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-neutral-100">{`${heir.first_name} ${heir.last_name}`}</div>
                      <div className="text-sm text-gray-500 dark:text-neutral-400">{heir.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900 dark:text-neutral-100">{heir.relation || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-900 dark:text-neutral-100">{heir.phone}</div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="text-sm text-gray-900 dark:text-neutral-100">{`${heir.street_address_1}, ${heir.city}, ${heir.state} ${heir.zipcode}`}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900 dark:text-neutral-100">{`${heir.target_percentage}%`}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(heir)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* End Table */}

      {/* Footer */}
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
        <div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            <span className="font-semibold text-gray-800 dark:text-neutral-200">{heirs.length}</span> results
          </p>
        </div>

        <div>
          <div className="inline-flex gap-x-2">
            <Button variant="outline" size="sm">
              <ChevronDown className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
      {/* End Footer */}
    </div>
  )
}